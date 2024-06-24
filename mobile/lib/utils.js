
export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validatePassword = (password) => {
    return password.length >= 4;
}

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