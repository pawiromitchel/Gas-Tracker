function capitalize(myStr) {
    return myStr.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
}

function removeDashes(word) {
    return word.replace(/-/g, ' ');
}