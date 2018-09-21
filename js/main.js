if ('serviceWorker' in navigator) 
{
    console.log("Supported")
    window.addEventListener('load', () => 
    {
        navigator.serviceWorker.register("../sw_cached_site.js")
        .then(reg => console.log("Service Worker: Registered"))
        .catch(err => console.log("Didnt work: ${err}")) 
    })
}