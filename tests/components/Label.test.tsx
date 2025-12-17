import { render, screen } from "@testing-library/react";
import Label from "../../src/components/Label";
import { LanguageProvider } from "../../src/providers/language/LanguageProvider";
import { Language } from "../../src/providers/language/type";

describe("Label", () => {
  const renderComponent = (lableId: string, language: Language) => {
    render(
      <LanguageProvider language={language}>
        <Label labelId={lableId} />
      </LanguageProvider>
    );
  };

  describe("Given the current language is EN", () => {
    it.each([
      { lableId: "welcome", text: "Welcome" },
      { lableId: "new_product", text: "New Product" },
      { lableId: "edit_product", text: "Edit Product" },
    ])("should render $text for $lableId", ({ lableId, text }) => {
      renderComponent(lableId, "en");

      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  describe("Given the current language is ES", () => {
    it.each([
      { lableId: "welcome", text: "Bienvenidos" },
      { lableId: "new_product", text: "Nuevo Producto" },
      { lableId: "edit_product", text: "Editar Producto" },
    ])("should render $text for $lableId", ({ lableId, text }) => {
      renderComponent(lableId, "es");

      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("should throw na error if given an individual lableId", () => {
    expect(() => renderComponent("!", "en")).toThrowError();
  });
});
