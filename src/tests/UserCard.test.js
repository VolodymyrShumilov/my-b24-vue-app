import { mount } from "@vue/test-utils";
import { describe, test, expect } from "@jest/globals";
import UserCard from "../components/UserCard.vue";

describe("UserCard", () => {
  // Тест 1: Чи рендериться ім'я та прізвище з пропсу?
  test("Рендерить ім'я та прізвище з пропсу", () => {
    const wrapper = mount(UserCard, {
      props: {
        name: "Іван",
      },
    });

    expect(wrapper.find("h2").text()).toBe("Іван");
  });
});
