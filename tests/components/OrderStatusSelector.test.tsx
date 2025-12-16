import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderOrderStatusSelector = () => {
    const onChange = vi.fn();

    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      triger: screen.getByRole("combobox"),
      getOptions: () => screen.findAllByRole("option"),
      getOption: (lable: RegExp) =>
        screen.findByRole("option", { name: lable }),
      user: userEvent.setup(),
      onChange: onChange,
    };
  };

  it("should render New as the default value", () => {
    const { triger } = renderOrderStatusSelector();

    expect(triger).toHaveTextContent(/new/i);
  });

  it("should render correct statuses", async () => {
    const { triger, getOptions, user } = renderOrderStatusSelector();

    await user.click(triger);

    const options = await getOptions();
    expect(options).toHaveLength(3);
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  it.each([
    { label: /processed/i, value: "processed" },
    { label: /fulfilled/i, value: "fulfilled" },
  ])(
    "should call onChange with $value when the $lable option is selected",
    async ({ label, value }) => {
      const { triger, user, onChange, getOption } = renderOrderStatusSelector();
      await user.click(triger);

      const option = await getOption(label);
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  it("should call onChange with 'new' when the New option is selected", async () => {
    const { triger, user, onChange, getOption } = renderOrderStatusSelector();
    await user.click(triger);

    const processedOption = await getOption(/processed/i);
    await user.click(processedOption);

    await user.click(triger);
    const newOption = await getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
