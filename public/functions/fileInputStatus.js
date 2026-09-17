const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

document.querySelectorAll('input[type="file"]').forEach((input) => {
    const status = document.getElementById(`${input.id}-status`);
    if (!status) return;

    input.addEventListener("change", () => {
        const file = input.files?.[0];

        if (!file) {
            status.textContent = "Nenhuma imagem selecionada";
            status.classList.remove("text-emerald-300");
            status.classList.add("text-gray-500");
            return;
        }

        status.textContent = `${file.name} · ${formatFileSize(file.size)}`;
        status.classList.remove("text-gray-500");
        status.classList.add("text-emerald-300");
    });
});