import { Header } from "@/modules/shared/Header";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import { server } from "@/__tests__/setup-server";
import { Providers } from "@/modules/shared/providers";

beforeAll(() => {
  server.listen();
});

describe(Header.name, () => {
  test("render", () => {
    const { container } = render(
      <Providers>
        <Header activeHotel={{ id: "1", name: "Ritz" }} />
      </Providers>,
    );

    expect(container.textContent).toMatchInlineSnapshot(`"RitzProdukty"`);
  });
});
