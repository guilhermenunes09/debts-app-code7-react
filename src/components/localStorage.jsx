

function setLocalStorage (key, value) {
    localStorage.removeItem(`${key}`);
    localStorage.setItem(`${key}`, value);
}

export { setLocalStorage };