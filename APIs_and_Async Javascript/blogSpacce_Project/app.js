// to get the first five posts 

const FivePosts = document.getElementById("Five-Posts")
FivePosts.innerHTML = 
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
    const postsArr = data.slice(0, 5)
    let html = ''
    postsArr.forEach(post => 
    {
        html += ` 
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        `;
    });
    document.getElementById("Five-Posts").innerHTML = html;
        
    })
