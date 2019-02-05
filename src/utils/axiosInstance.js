import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.FAST_FOOD_FAST_API_URL || 'https://fast-food-fast-20188.herokuapp.com/api/v1',
});
