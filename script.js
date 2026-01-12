let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    hueRotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 100,
        unit: "px"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    }
};
const preset ={
    "Vintage": {
        brightness: 110,
        contrast: 120,
        saturation: 80,
        sepia: 30,
        hueRotate: 10
    },
    "Cool Tone": {
        brightness: 90,
        contrast: 110,
        saturation: 70,
        hueRotate: 200
    },
    "Warm Glow": {
        brightness: 120,
        contrast: 100,
        saturation: 130,
        hueRotate: 20
    },
    "Black & White": {
        brightness: 100,
        contrast: 130,
        saturation: 0,
        grayscale: 100
    },
    "High Contrast": {
        brightness: 100,
        contrast: 150,
        saturation: 100
    },
    "Soft Focus": {
        brightness: 110,
        contrast: 90,
        saturation: 100,
        blur: 5
    },
    "Faded": {
        brightness: 120,
        contrast: 80,
        saturation: 70
    },
    "Dramatic": {
        brightness: 90,
        contrast: 160,
        saturation: 100,
        hueRotate: 30
    },
    "Sepia Tone": {
        brightness: 100,
        contrast: 110,
        saturation: 90,
        sepia: 60
    },
    "Vibrant": {
        brightness: 110,
        contrast: 120,
        saturation: 150
    },
    "Cinematic": {
        brightness: 95,
        contrast: 140,
        saturation: 110,
        hueRotate: 15
    },
    "Moody": {
        brightness: 80,
        contrast: 150,
        saturation: 90
    },
    "Night Vision": {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        grayscale: 100
    },
    "Pastel": {
        brightness: 120,
        contrast: 90,
        saturation: 130
    },
    "Retro": {
        brightness: 110,
        contrast: 100,
        saturation: 80,
        sepia: 40
    },
    "Bright & Airy": {
        brightness: 130,
        contrast: 100,
        saturation: 120
    },
    "Dark & Moody": {
        brightness: 70,
        contrast: 160,
        saturation: 80
    },
    "Golden Hour": {
        brightness: 120,
        contrast: 110,
        saturation: 140,
        hueRotate: 30
    },
    "Cool Blues": {
        brightness: 100,
        contrast: 120,
        saturation: 80,
        hueRotate: 220
    },
    "Sunset Glow": {
        brightness: 120,
        contrast: 100,
        saturation: 130,
        hueRotate: 40
    },
    "Matte Finish": {
        brightness: 100,
        contrast: 90,
        saturation: 100,
        blur: 2
    }
}
const imageCanvas = document.getElementById("image-canvas");
const imageInput = document.getElementById("input-image");

const downloadBtn = document.getElementById("download-btn");
const resetBtn = document.getElementById("reset-btn");

const presetsContainer = document.querySelector(".presets");

const ctx = imageCanvas.getContext("2d");

let file =null;
let image =null;

function createFilterElement(name, unit="%", value, min, max) {
    

    const container = document.createElement("div");
    container.classList.add("filter-container");
    const p = document.createElement("p");
    p.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = `filter-${name}`;
    input.dataset.filterName = name;
    const span = document.createElement("span");
    span.textContent = `${value}${unit}`;

    container.appendChild(p);
    container.appendChild(input);
    container.appendChild(span);

    input.addEventListener("input", function(event) {
        filters[name].value = input.value;
        applyFilters();
        span.textContent = `${input.value}${unit}`;
        // const filterName = event.target.dataset.filterName;
        // const filterValue = event.target.value;
        // span.textContent = `${filterValue}${unit}`;
        // filters[filterName].value = filterValue;

        // let filterString = "";
        // Object.keys(filters).forEach(fname => {
        //     const f = filters[fname];
        //     let fValue = f.value;
        //     if(fname === "hueRotate") {
        //         filterString += `${fname}(${fValue}${f.unit}) `;
        //     } else {
        //         filterString += `${fname}(${fValue}${f.unit}) `;
        //     }
        // });

        // ctx.filter = filterString.trim();
        // ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        // ctx.drawImage(image, 0, 0);
    });
    return container;
}

Object.keys(filters).forEach(filterName => {
    const filter = filters[filterName];
    const filterElement = createFilterElement(filterName, filter.unit, filter.value, filter.min, filter.max);
    
    document.querySelector(".filter").appendChild(filterElement);
});

imageInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    const placeholder = document.querySelector(".placeholder");
    placeholder.style.display = "none";
    imageCanvas.style.display = "block";

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function() {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    }

})

function applyFilters() {
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    ctx.filter =`brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    `.trim();
    ctx.drawImage(image, 0, 0);
};

resetBtn.addEventListener("click", function() {
    filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    hueRotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 100,
        unit: "px"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    }
};
    applyFilters();
    // Update UI sliders
    Object.keys(filters).forEach(filterName => {
        const filter = filters[filterName];
        const input = document.getElementById(`filter-${filterName}`);
        const span = input.nextSibling;
        input.value = filter.value;
        span.textContent = `${filter.value}${filter.unit}`;
    });
}) ;

downloadBtn.addEventListener("click", function() {
    const link = document.createElement("a");
    console.log('link', link)
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
});

Object.keys(preset).forEach(presetName => {
    const presetBtn = document.createElement("button");
    presetBtn.classList.add("btn");
    presetBtn.textContent = presetName;
    presetBtn.addEventListener("click", function() {
        const presetFilters = preset[presetName];
        Object.keys(presetFilters).forEach(filterName => {
            filters[filterName].value = presetFilters[filterName];
            // Update UI sliders
            const input = document.getElementById(`filter-${filterName}`);
            const span = input.nextSibling;
            input.value = presetFilters[filterName];
            span.textContent = `${presetFilters[filterName]}${filters[filterName].unit}`;
        });
        applyFilters();
    });
    presetsContainer.appendChild(presetBtn);
});