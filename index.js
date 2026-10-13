let oldTotalDownloads = null;

async function updateCounter() {
    const counterElement = document.getElementById('counter');

    try {
        const response = await fetch(`https://api.modrinth.com/v2/user/NotchArrow/projects`);

        if (!response.ok) {
            throw new Error(`Modrinth API error: ${response.status} ${response.statusText}`);
        }

        const projects = await response.json();
        const totalDownloads = projects.reduce((sum, project) => sum + project.downloads, 0);

        counterElement.textContent = totalDownloads.toLocaleString();

        if (totalDownloads !== oldTotalDownloads) {
            counterElement.classList.remove('pulse-effect');
            void counterElement.offsetWidth;
            counterElement.classList.add('pulse-effect');

            oldTotalDownloads = totalDownloads;
        }


    } catch (error) {
        console.error('Download counter fetch failed:', error);
    }
}

updateCounter();
// swap to GitHub Actions and backend cache