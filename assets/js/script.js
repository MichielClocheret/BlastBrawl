fetch("http://localhost:3000/youtube-feed")
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
  })
  .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "text/xml");
      const latestVideo = xml.querySelector("entry > link").getAttribute("href");

      document.getElementById("latest-video").innerHTML = `
        <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/${latestVideo.split("v=")[1]}" 
                frameborder="0" 
                allowfullscreen></iframe>`;
  })
  .catch(error => {
      console.error("Error fetching the YouTube feed:", error);
      document.getElementById("latest-video").textContent = "Video couldn't load :(";
  });
