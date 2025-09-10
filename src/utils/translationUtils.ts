const translate = (key: Record<string, string>, translation: Record<string, string>) => {
    const translationKey = Object.keys(key)[0];
    if (translation && translation[translationKey]) {
        return translation[translationKey];
    }
    return key[translationKey] || "";
}
 
export default translate;