import { useState } from "react";
// import { test, expect } from '@playwright/test';
import { Button, Card, Form } from "react-bootstrap";

export const VatCalculator = () => {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState(20); // 20% default VAT rate
  const [result, setResult] = useState<number | null>(null);

  const calculateVAT = () => {
    const amountValue = parseFloat(amount);
    if (!isNaN(amountValue)) {
      const vat = (amountValue * vatRate) / 100;
      setResult(amountValue + vat);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="w-50 p-4 shadow">
        <Card.Body>
          <h1 className="text-center mb-4">Калкулатор за ДДС</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Сума без ДДС</Form.Label>
              <Form.Control
                type="number"
                placeholder="Въведете сума"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="w-100" onClick={calculateVAT}>
              Изчисли
            </Button>
          </Form>
          {result !== null && (
            <div className="text-center mt-4">
              <p className="fw-bold">
                Обща сума с ДДС: {result.toFixed(2)} лв.
              </p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

/**
 * Тестови случаи:
 * 1. Въвеждане на валидна сума и изчисляване на ДДС.
 * 2. Въвеждане на невалидна сума (букви или празно поле).
 * 3. Проверка дали резултатът е форматиран до две цифри след десетичната запетая.
 * 4. Проверка на крайния резултат при различни стойности на сумата.
 *
 * Тестови скрипт с Playwright (TypeScript):
 *
 * import { test, expect } from '@playwright/test';
 *
 * test('валидна сума', async ({ page }) => {
 *   await page.goto('http://localhost:3000');
 *   await page.fill('input', '100');
 *   await page.click('button');
 *   await expect(page.locator('p')).toHaveText('Обща сума с ДДС: 120.00 лв.');
 * });
 *
 * test('невалидна сума', async ({ page }) => {
 *   await page.goto('http://localhost:3000');
 *   await page.fill('input', 'abc');
 *   await page.click('button');
 *   await expect(page.locator('p')).not.toBeVisible();
 * });
 *
 * test('празно поле', async ({ page }) => {
 *   await page.goto('http://localhost:3000');
 *   await page.click('button');
 *   await expect(page.locator('p')).not.toBeVisible();
 * });
 */
