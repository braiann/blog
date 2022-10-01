export default function generateSlug(title) {
    return title.toLowerCase().replaceAll(' ', '-')
}