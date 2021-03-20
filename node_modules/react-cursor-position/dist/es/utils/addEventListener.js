export default function addEventListener(node, eventName, handler, options) {
    node.addEventListener(eventName, handler, options);
    return {
        removeEventListener: function removeEventListener() {
            node.removeEventListener(eventName, handler, options);
        }
    };
}