const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpi = window.devicePixelRatio;
const screenWidth = window.innerWidth * dpi;
const screenHeight = window.innerHeight * dpi;


//fixing differnce between virtual and actual device pixels
function fixDPI() {
    
    const style = {
        get width() {
            return getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
        },
        
        get height() {
            return getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
        }
    }

    canvas.setAttribute('width', style.width * dpi);
    canvas.setAttribute('height', style.height * dpi);
}