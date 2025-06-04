import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080');
});

const delay = (ms: number): Promise<void> => {
  return new Promise(res => setTimeout(res, ms));
};

// Helper function to simulate a corner click
async function clickCorner(page: Page, cornerId: 'ul' | 'ur' | 'dl' | 'dr') {
  await page.locator(`#${cornerId}`).click();
}

// Helper to start the game with default settings
async function startGame(page: Page) {
  await page.click('#startBtn');
  await page.waitForSelector('#game.active'); // Wait for the game screen to become active
}

async function getTextContent(page: Page, selector: string) {
    return await page.locator(selector).textContent();
}

async function isVisible(page: Page, selector: string) {
    return await page.locator(selector).isVisible();
}

test.describe('Blindfold Chess Application Tests', () => {

  test('should not display "Board 1" when starting a single board game', async ({ page }) => {
    await page.selectOption('#boardsSelect', '1'); // Ensure 1 board is selected
    await startGame(page);
    const boardNumberText = await getTextContent(page, '#boardNumber');
    expect(boardNumberText).toBe(''); // No board number for single player game
  });

  test('should display "Board 1" then "Board 2" then "Board 1" when starting a 2-board game and making moves', async ({ page }) => {
    await page.selectOption('#boardsSelect', '2'); // Select 2 boards
    await startGame(page);

    // Initially, it should display "Board 1"
    let boardNumberText = await getTextContent(page, '#boardNumber');
    expect(boardNumberText).toBe('Board 1');

    // Make a move on Board 1 (e.g., White's pawn e2-e4)
    await clickCorner(page, 'dr');
    await clickCorner(page, 'dl');
    await clickCorner(page, 'ul'); // from e2

    // After selecting 'from' square, board number should still be "Board 1"
    boardNumberText = await getTextContent(page, '#boardNumber');
    expect(boardNumberText).toBe('Board 1');
     
    await clickCorner(page, 'dr');
    await clickCorner(page, 'ul');
    await clickCorner(page, 'ul'); // to e4

    // After completing the move, it should switch to Board 2
    await page.waitForFunction(() => document.getElementById('boardNumber')?.textContent === 'Board 2');
    
    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/[♙♘].[12]-.+/));

    // Make a move on Board 2 (e.g., Black's pawn d7-d5)
    await clickCorner(page, 'dr');
    await clickCorner(page, 'dl');
    await clickCorner(page, 'ul'); // from d7

    // After selecting 'from' square, board number should still be "Board 2"
    expect(await getTextContent(page, '#boardNumber')).toBe('Board 2');

    await clickCorner(page, 'dr');
    await clickCorner(page, 'ul');
    await clickCorner(page, 'ul'); // to d5

    // After completing the move, it should switch back to Board 1
    await page.waitForFunction(() => document.getElementById('boardNumber')?.textContent === 'Board 1');
  });

  test('displayLastMoveString should update correctly for standard moves', async ({ page }) => {
    await startGame(page); // Start a single board game (player white)

    // Initial state: last move string should be empty
    let lastMoveString = await getTextContent(page, '#lastMoves');
    expect(lastMoveString).toBe('');

    // Simulate White's first move: e2-e4
    await clickCorner(page, 'dr');
    await clickCorner(page, 'dl');
    await clickCorner(page, 'ul'); // from e2

    lastMoveString = await getTextContent(page, '#lastMoves');
    // After selecting 'from' square, it should show the piece and origin
    expect(lastMoveString).toMatch(/♙e2-\?/); // Assuming pawn icon and e2-?

    await clickCorner(page, 'dr');
    await clickCorner(page, 'ul');
    await clickCorner(page, 'ul'); // to e4

    // Even a few milliseconds after the move, it should show the move notation
    await delay(100)
    lastMoveString = await getTextContent(page, '#lastMoves');
    expect(lastMoveString).toMatch(/♙e2-e4/);

    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/[♟♞].[78]-.+/));
  });
});