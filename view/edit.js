 const form = document.getElementById("editform");
 const bttn = document.getElementById("button");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    try {
        const response = await fetch("/main/profile/edit", {
            method: "PATCH",
            credentials: "include",          // sends the cookie
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = "/main/profile";
        } else {
            console.log("Update failed", response.status, await response.text());
        }
    } catch (err) {
        console.error("Network error:", err);
    }
});

bttn.addEventListener("click" , async(e) =>{
    
})