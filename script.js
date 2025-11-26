

 document.addEventListener('DOMContentLoaded', function () {
    const profileImage = document.querySelector(".profile-img");
    profileImage.addEventListener("mouseover", (e) => {
      e.preventDefault();
      
      profileImage.computedStyleMap.opacity = 0.5;
      
    })
    console.log(profileImage)
 });
