export const setPageTitle = title => {
    document.querySelector('[property="og:title"]').content = title
    document.querySelector('[name="twitter:title"]').content = title
}
