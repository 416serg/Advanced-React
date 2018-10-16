function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFaveFoods = function() {
  return new Promise((resolve, reject) => {
    // Simulate an API
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('snickers');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('snickers');
    fetchDogs('hugo');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it('can create a person', () => {
    const me = new Person('Serg', ['pizza', 'burgs']);
    expect(me.name).toBe('Serg');
  });

  it('can fetch foods', async () => {
    const me = new Person('Serg', ['pizza', 'burgs']);
    // Mock the favFoods function
    me.fetchFaveFoods = jest.fn().mockResolvedValue(['sushi', 'ramen']);
    const favFoods = await me.fetchFaveFoods();
    console.log(favFoods);
    expect(favFoods).toContain('sushi');
  });
});
