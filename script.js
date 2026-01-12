const filters = {
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
    exposure: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    }
};

const imageCanvas = document.getElementById("image-canvas");
const imageInput = document.getElementById("input-image");

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
}