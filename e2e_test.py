import requests
import os
import sys
import time

BASE_URL = "http://localhost:1142"

def run_tests():
    print("=" * 60)
    print("🚀 STARTING DEEP END-TO-END TESTING (AUTH + CRUD + FILE UPLOAD)")
    print("=" * 60)
    
    session = requests.Session()
    
    # 1. Test Homepage before Login
    print("\n[TEST 1] GET / (Unauthenticated)")
    r = session.get(f"{BASE_URL}/")
    assert r.status_code == 200, f"Expected 200, got {r.status_code}"
    assert "Login" in r.text, "Login link should be present"
    assert "Register" in r.text, "Register link should be present"
    print("  ✅ Homepage renders with Login/Register links")

    # 2. Test Registration
    username = f"testuser_{int(time.time())}"
    email = f"{username}@example.com"
    password = "SecretPassword123"
    print(f"\n[TEST 2] POST /register (New User: {username}, Email: {email})")
    r = session.post(f"{BASE_URL}/register", data={
        "Username": username,
        "Email": email,
        "Password": password
    }, allow_redirects=True)
    assert r.status_code == 200, f"Expected 200, got {r.status_code}"
    print(f"  ✅ Registration succeeded for {username}")

    # 3. Test Login
    print(f"\n[TEST 3] POST /sign-in (Logging in as {username})")
    r = session.post(f"{BASE_URL}/sign-in", data={
        "Username": username,
        "Password": password
    }, allow_redirects=True)
    assert r.status_code == 200, f"Expected 200, got {r.status_code}"
    assert "Logout" in r.text, "Logout button should be present in navbar when logged in"
    print("  ✅ Login succeeded and session cookie stored")

    # 4. Test Adding Project with Real Image File Upload
    print("\n[TEST 4] POST /add-post (Testing Multipart Form + Image Upload)")
    # Create dummy PNG file
    test_img_path = "/tmp/test_upload.png"
    with open(test_img_path, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82")

    with open(test_img_path, "rb") as f_img:
        files = {
            "image": ("test_upload.png", f_img, "image/png")
        }
        data = {
            "projectName": "Revival Super App",
            "startDate": "2026-08-01",
            "endDate": "2026-08-30",
            "konten": "A fullstack application with full file upload & PostgreSQL integration.",
            "nodeJs": "on",
            "reactJs": "on",
            "typeScript": "on"
        }
        r = session.post(f"{BASE_URL}/add-post", data=data, files=files, allow_redirects=True)
        assert r.status_code == 200, f"Expected 200, got {r.status_code}"
        assert "Revival Super App" in r.text, "New post title should be rendered in /blogs"
        assert "uploads/" in r.text, "Uploaded image path should be in HTML"
        assert username in r.text or "Wahyu" in r.text, "Author should be rendered"
    print("  ✅ Project created successfully with dynamic file upload into uploads/")

    # 5. Test Blog List and Detail Page
    print("\n[TEST 5] GET /blogs and GET /blog-detail/:id")
    r = session.get(f"{BASE_URL}/blogs")
    assert r.status_code == 200
    assert "Revival Super App" in r.text
    
    # Extract blog detail ID
    import re
    ids = re.findall(r'/blog-detail/(\d+)', r.text)
    assert len(ids) > 0, "Should find blog detail link"
    created_id = ids[-1]
    
    r_detail = session.get(f"{BASE_URL}/blog-detail/{created_id}")
    assert r_detail.status_code == 200, f"Expected 200, got {r_detail.status_code}"
    assert "Revival Super App" in r_detail.text
    print(f"  ✅ Blog detail page for ID {created_id} renders cleanly")

    # 6. Test Edit & Update with New Uploaded Image
    print(f"\n[TEST 6] POST /update-blog/{created_id} (Updating Post & New Image)")
    with open(test_img_path, "rb") as f_img2:
        files2 = {
            "image": ("test_update.png", f_img2, "image/png")
        }
        update_data = {
            "projectName": "Revival Super App (Updated Edition)",
            "startDate": "2026-08-05",
            "endDate": "2026-08-30",
            "konten": "Updated content with fresh image.",
            "nodeJs": "on",
            "reactJs": "on",
            "nextJs": "on"
        }
        r_update = session.post(f"{BASE_URL}/update-blog/{created_id}", data=update_data, files=files2, allow_redirects=True)
        assert r_update.status_code == 200
    
    r_detail_updated = session.get(f"{BASE_URL}/blog-detail/{created_id}")
    assert "Revival Super App (Updated Edition)" in r_detail_updated.text
    print(f"  ✅ Post {created_id} updated successfully")

    # 7. Test Delete Post
    print(f"\n[TEST 7] POST /delete-blog/{created_id}")
    r_del = session.post(f"{BASE_URL}/delete-blog/{created_id}", allow_redirects=True)
    assert r_del.status_code == 200
    r_check = session.get(f"{BASE_URL}/blogs")
    assert "Revival Super App (Updated Edition)" not in r_check.text
    print(f"  ✅ Post {created_id} deleted successfully")

    # 8. Test Logout
    print("\n[TEST 8] GET /logout (Logging Out)")
    r_logout = session.get(f"{BASE_URL}/logout", allow_redirects=True)
    assert r_logout.status_code == 200
    assert "Login" in r_logout.text, "Navbar should show Login again"
    assert "Logout" not in r_logout.text, "Logout button should be gone"
    print("  ✅ Logout succeeded, session destroyed, navbar state reverted")

    # Clean up test file
    if os.path.exists(test_img_path):
        os.remove(test_img_path)

    print("\n" + "=" * 60)
    print("🎉 ALL END-TO-END TESTS PASSED WITH 100% SUCCESS!")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
