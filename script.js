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
    return container;
}

Object.keys(filters).forEach(filterName => {
    const filter = filters[filterName];
    const filterElement = createFilterElement(filterName, filter.unit, filter.value, filter.min, filter.max);
    
    document.querySelector(".filter").appendChild(filterElement);
});