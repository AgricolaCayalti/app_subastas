// utils/colorUtils.ts (o donde prefieras)
export function isColorDark(color: string): boolean {
    // Si el color es un nombre o variable CSS, lo resolvemos temporalmente
    // Para simplificar, asumimos que el color se pasa ya resuelto (por ejemplo, desde getComputedStyle)
    // Si no, puedes usar un canvas para obtener el RGB real.

    // Función para convertir hex a RGB
    const hexToRgb = (hex: string): [number, number, number] | null => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
            : null;
    };

    // Función para parsear rgb(r,g,b) o rgba(r,g,b,a)
    const rgbToArray = (rgb: string): [number, number, number] | null => {
        const match = rgb.match(/(\d+\.?\d*)/g);
        if (match && match.length >= 3) {
            return [parseFloat(match[0]), parseFloat(match[1]), parseFloat(match[2])];
        }
        return null;
    };

    let r: number, g: number, b: number;

    // Si empieza con #, es hex
    if (color.startsWith('#')) {
        const rgb = hexToRgb(color);
        if (!rgb) return false; // fallback
        [r, g, b] = rgb;
    }
    // Si empieza con rgb o rgba
    else if (color.startsWith('rgb')) {
        const rgb = rgbToArray(color);
        if (!rgb) return false;
        [r, g, b] = rgb;
    }
    // Si es un nombre conocido (white, black, etc.) o variable CSS no resuelta
    else {
        // Para simplificar, usamos un mapa básico de colores comunes
        const namedColors: Record<string, [number, number, number]> = {
            white: [255, 255, 255],
            black: [0, 0, 0],
            red: [255, 0, 0],
            green: [0, 128, 0],
            blue: [0, 0, 255],
            // ... añade los que necesites
        };
        if (namedColors[color.toLowerCase()]) {
            [r, g, b] = namedColors[color.toLowerCase()];
        } else {
            // Si no lo reconocemos, asumimos claro (o puedes lanzar error)
            return false;
        }
    }

    // Fórmula de luminancia relativa (percepción humana)
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance < 128; // Umbral: 128 es punto medio
}