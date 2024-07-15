async function funcRequest(url, maxRetries = 10, retryDelay = 5) {
    //true
    //i = 0
    for (let retries = 0; retries < maxRetries; retries++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 500) {
                    await new Promise((resolve) => setTimeout(resolve, retryDelay));
                    continue;
                }
                throw new Error(`HTTP error ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error:", error);
            if (error.message === "HTTP error 500") {
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                continue;
            }
            if (retries === maxRetries - 1) {
                throw error;
            }
        }
    }
}