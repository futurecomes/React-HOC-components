export const changeUrl = item =>
    item.url
        ? {
              ...item,
              url: item.url
                  .replace(
                      'https://s3.amazonaws.com/messybun',
                      'https://messybun.s3-accelerate.amazonaws.com',
                  )
                  .replace(
                      'https://messybun.s3.amazonaws.com',
                      'https://messybun.s3-accelerate.amazonaws.com',
                  ),
          }
        : item
