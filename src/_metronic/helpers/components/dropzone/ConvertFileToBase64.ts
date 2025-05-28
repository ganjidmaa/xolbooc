// function ConvertFileToBase64(file: any) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

// export {ConvertFileToBase64}

function ConvertFileToBase64(file: any): Promise<string> {
    const maxWidth = 1300;
    const maxHeight = 1300;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result as string;

            img.onload = () => {
                // Calculate new dimensions
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    const aspectRatio = width / height;

                    if (width > height) {
                        width = maxWidth;
                        height = maxWidth / aspectRatio;
                    } else {
                        height = maxHeight;
                        width = maxHeight * aspectRatio;
                    }
                }

                // Resize the image using a canvas
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Failed to get canvas context"));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                // Convert resized image to base64
                const resizedBase64 = canvas.toDataURL(file.type, 0.9); // Adjust quality (0.8 = 80%)
                resolve(resizedBase64);
            };

            img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
    });
}

export { ConvertFileToBase64 };
