
export const updateUrlForStatic = (url: string, size?: [number, number]): string => `${process.env.REACT_APP_API_STATIC_URL}/${size?.length === 2 ? `${size[0]}x${size[1]}/` : ''}${url}`;

