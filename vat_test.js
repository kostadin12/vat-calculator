const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function vatCalculatorTests() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get('http://localhost:3000');

        // Wait until input field is present
        let input = await driver.wait(until.elementLocated(By.css('input[type="number"]')), 5000);
        let button = await driver.findElement(By.css('button'));
        let resultSelector = By.css('.fw-bold');

        // **Test 1: Валидна стойност**
        await input.clear();
        await input.sendKeys('100');
        await button.click();
        await driver.wait(until.elementLocated(resultSelector), 2000);
        let output = await driver.findElement(resultSelector).getText();
        assert(output.includes('Обща сума с ДДС: 120.00 лв.'), 'Valid input test failed');

        // **Test 2: Невалидна стойност**
        await input.clear();
        await input.sendKeys('abc');
        await button.click();
        await driver.sleep(1000); // Wait for UI to update
        let elements = await driver.findElements(resultSelector);
        assert(elements.length === 0, 'Invalid input test failed');

        // **Test 3: Празна стойност**
        await input.clear();
        await button.click();
        await driver.sleep(1000);
        elements = await driver.findElements(resultSelector);
        assert(elements.length === 0, 'Empty input test failed');

        // **Тест 4: Проверка на форматирането на резултата**
        await input.clear();
        await input.sendKeys('123.4567');
        await button.click();
        await driver.wait(until.elementLocated(resultSelector), 2000);
        output = await driver.findElement(resultSelector).getText();
        assert(output.includes('Обща сума с ДДС: 148.15 лв.'), 'Форматиране на резултата - тестът не успя');

        // **Тест 5: Проверка с гранична стойност (0)**
        await input.clear();
        await input.sendKeys('0');
        await button.click();
        await driver.wait(until.elementLocated(resultSelector), 2000);
        output = await driver.findElement(resultSelector).getText();
        assert(output.includes('Обща сума с ДДС: 0.00 лв.'), 'Гранична стойност (0) - тестът не успя');

        console.log(' Всички тестове преминаха успешно!');
    } finally {
        await driver.quit();
    }
})();