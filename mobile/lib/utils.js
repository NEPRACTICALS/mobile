

// function to validate post data

export const validatePost = (post) => {
    return {
      userId: {
        valid: post.title.length > 0,
        message: "userId is required"
      },
      title: {
        valid: post.title.length > 0,
        message: "title is required"
      },
      body: {
        valid: post.body.length > 0,
        message: "body must be greater than 0"
      }
    };
}