import {
  constructorReducer,
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientUp,
  moveIngredientDown,
  initialState
} from './burgers';
import { TConstructorIngredient } from '@utils-types';

describe('burgers reducer', () => {
  const sauce: TConstructorIngredient = {
    _id: '1',
    name: 'Соус',
    type: 'sauce',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 50,
    image: 'https://test.link.png',
    image_mobile: 'https://test.link.png',
    image_large: 'https://test.link.png',
    id: 'sauce1'
  };

  const main: TConstructorIngredient = {
    _id: '2',
    name: 'Говядина',
    type: 'main',
    proteins: 30,
    fat: 40,
    carbohydrates: 50,
    calories: 100,
    price: 200,
    image: '',
    image_mobile: '',
    image_large: '',
    id: 'main1'
  };

  const main2: TConstructorIngredient = {
    ...main,
    id: 'main2'
  };

  describe('addIngredientToConstructor', () => {
    it('должен добавлять ингредиент не типа "bun" в список', () => {
      const state = constructorReducer(initialState, addIngredientToConstructor(sauce));
      expect(state.constructorItems.ingredients.length).toBe(1);
      expect(state.constructorItems.ingredients[0]).toEqual(
        expect.objectContaining({
          ...sauce,
          id: expect.any(String)
        })
      );
    });

    it('должен добавлять ингредиент типа "bun" как bun', () => {
      const bun = { ...sauce, type: 'bun' };
      const state = constructorReducer(initialState, addIngredientToConstructor(bun));
      expect(state.constructorItems.bun).toEqual(
        expect.objectContaining({
          ...bun,
          id: expect.any(String)
        })
      );
    });

    it('должен заменять уже установленную булку', () => {
      const prevBun = { ...sauce, id: 'oldBun', type: 'bun' };
      const newBun = { ...sauce, id: 'newBun', type: 'bun', name: 'New Bun' };
      const customState = {
        ...initialState,
        constructorItems: {
          bun: prevBun,
          ingredients: []
        }
      };
      const state = constructorReducer(customState, addIngredientToConstructor(newBun));
      expect(state.constructorItems.bun?.name).toBe('New Bun');
    });
  });

  describe('removeIngredientFromConstructor', () => {
    it('должен удалять ингредиент по id', () => {
      const customState = {
        ...initialState,
        constructorItems: {
          bun: null,
          ingredients: [sauce]
        }
      };
      const state = constructorReducer(customState, removeIngredientFromConstructor('sauce1'));
      expect(state.constructorItems.ingredients).toHaveLength(0);
    });
  });

  describe('moveIngredient', () => {
    const setupState = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [sauce, main, main2]
      }
    };

    it('перемещает ингредиент вверх', () => {
      const state = constructorReducer(setupState, moveIngredientUp('main2'));
      expect(state.constructorItems.ingredients.map(i => i.id)).toEqual([
        'sauce1',
        'main2',
        'main1'
      ]);
    });

    it('перемещает ингредиент вниз', () => {
      const state = constructorReducer(setupState, moveIngredientDown('main1'));
      expect(state.constructorItems.ingredients.map(i => i.id)).toEqual([
        'sauce1',
        'main2',
        'main1'
      ]);
    });

    it('не перемещает вверх первый элемент', () => {
      const state = constructorReducer(setupState, moveIngredientUp('sauce1'));
      expect(state.constructorItems.ingredients.map(i => i.id)).toEqual([
        'sauce1',
        'main1',
        'main2'
      ]);
    });

    it('не перемещает вниз последний элемент', () => {
      const state = constructorReducer(setupState, moveIngredientDown('main2'));
      expect(state.constructorItems.ingredients.map(i => i.id)).toEqual([
        'sauce1',
        'main1',
        'main2'
      ]);
    });
  });
});
