import { mount } from "@vue/test-utils";
import VerifyCodeInput from "@/components/VerifyCodeInput";

describe("VerifyCodeInput.vue", () => {
  it('Check props "input count"', async () => {
    let wrapperWithDefaultPropsValues = await mount(VerifyCodeInput);
    expect(
      wrapperWithDefaultPropsValues.findAll(".verify-code-input").length
    ).toBe(4);

    let wrapper = await mount(VerifyCodeInput, { props: { countInputs: 2 } });
    expect(wrapper.findAll(".verify-code-input").length).toBe(2);

    let wrapper2 = await mount(VerifyCodeInput, { props: { countInputs: 5 } });
    expect(wrapper2.findAll(".verify-code-input").length).toBe(5);
  });
});

describe("VerfiyCodeInput.vue", () => {
  it("Test range selected input index", async () => {
    let wrapper = await mount(VerifyCodeInput);
    let selectedInputId = wrapper.vm.selectedInputIndex;

    for (let index = 0; index < 4; index++) {
      expect(selectedInputId).toEqual(index);

      await wrapper.find(`[data-id='${selectedInputId}']`).setValue(index);

      selectedInputId = wrapper.vm.selectedInputIndex;
    }

    await wrapper.find(`[data-id='${selectedInputId}']`).setValue(4);

    selectedInputId = wrapper.vm.selectedInputIndex;

    expect(selectedInputId).not.toBeGreaterThan(3);

    await wrapper.vm.decrementInputIndex();

    expect(wrapper.vm.selectedInputIndex).toEqual(2);

    await wrapper.vm.decrementInputIndex();

    expect(wrapper.vm.selectedInputIndex).toEqual(1);

    await wrapper.vm.decrementInputIndex();

    expect(wrapper.vm.selectedInputIndex).toEqual(0);

    await wrapper.vm.decrementInputIndex();

    expect(wrapper.vm.selectedInputIndex).toEqual(0);
  });
});
