# Multi-stage Build for Golang App
FROM golang:1.20-alpine AS builder

WORKDIR /app

# Download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code and build optimized binary
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server .

# Final Lightweight Runtime Image
FROM alpine:3.18

RUN apk --no-cache add ca-certificates tzdata
WORKDIR /app

# Copy binary & static assets
COPY --from=builder /app/server .
COPY --from=builder /app/assets ./assets
COPY --from=builder /app/bootstrap ./bootstrap
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/css ./css
COPY --from=builder /app/script ./script

# Create uploads directory
RUN mkdir -p uploads

ENV PORT=1142
EXPOSE 1142

CMD ["./server"]
