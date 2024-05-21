async function fetchData() {
    try {
        const username = document.getElementById("usernameInput").value;
        
 //user
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error("Fetching user data failed");
        }

        const userData = await response.json();
        const image = userData.avatar_url;
        const fullName = userData.name || "No name available"; 
        const email = userData.email || "No email available"; 


        const usernameImage = document.getElementById("userImage");
        usernameImage.src = image;
        usernameImage.style.display = "block";

        const nameElement = document.getElementById("userFullName");
        nameElement.textContent = `Name: ${fullName}`;
        nameElement.style.display = "block";

        const emailElement = document.getElementById("userEmail");
        emailElement.textContent = `Email: ${email}`;
        emailElement.style.display = "block";

    //repo
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!reposResponse.ok) {
            throw new Error("Fetching repositories failed");
        }

        const reposData = await reposResponse.json();
        const reposList = document.getElementById("reposList");
        reposList.innerHTML = "";

        for (const repo of reposData) {
    
            const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`);
            if (!commitsResponse.ok) {
                throw new Error("Fetching commits failed");
            }
            const commitsData = await commitsResponse.json();

    
            const issuesResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/issues`);
            if (!issuesResponse.ok) {
                throw new Error("Fetching issues failed");
            }
            const issuesData = await issuesResponse.json();

            const listItem = document.createElement("li");
            const repoLink = document.createElement("a");
            repoLink.href = repo.html_url;
            repoLink.target = "_blank";
            repoLink.className = "repo-link";

            const repoName = document.createElement("span");
            repoName.textContent = repo.name;
            repoName.className = "repo-name";

            const repoStars = document.createElement("span");
            repoStars.textContent = `Stars: ${repo.stargazers_count}`;
            repoStars.className = "repo-stars";

            const repoCommits = document.createElement("span");
            repoCommits.textContent = `Commits: ${commitsData.length}`;
            repoCommits.className = "repo-commits";

            const repoComments = document.createElement("span");
            repoComments.textContent = `Comments: ${issuesData.length}`;
            repoComments.className = "repo-comments";

            repoLink.appendChild(repoName);
            repoLink.appendChild(repoStars);
            repoLink.appendChild(repoCommits);
            repoLink.appendChild(repoComments);
            listItem.appendChild(repoLink);
            reposList.appendChild(listItem);
        }

    } catch (error) {
        console.error(error);
    }
}

document.querySelector("button").addEventListener("click", fetchData);
