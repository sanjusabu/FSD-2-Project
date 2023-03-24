const reducer = (state, action) => {
    switch (action.type) {
      case 'REMOVE_USER':
        return {
          ...state,
          users: state.users.filter(user => {
            return user.id !== action.payload;
          })
        }
      default:
        return state;
    }
}

export default reducer;