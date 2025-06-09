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
type CornerIdType = 'ul' | 'ur' | 'dl' | 'dr';
async function clickCorners(page: Page, ...cornerIds: CornerIdType[]) {
  for (let cornerId of cornerIds) {
    await clickCorner(page, cornerId);
  }
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

async function waitFor(predicate: () => boolean) {
    while (!predicate()) {
        await delay(100);
    }
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

    await clickCorners(page, 'dr', 'dl', 'ul'); // White pawn from e2

    // After selecting 'from' square, board number should still be "Board 1"
    boardNumberText = await getTextContent(page, '#boardNumber');
    expect(boardNumberText).toBe('Board 1');
     
    await clickCorners(page, 'dr', 'ul', 'ul'); // to e4

    // After completing the move, it should switch to Board 2
    await page.waitForFunction(() => document.getElementById('boardNumber')?.textContent === 'Board 2');
    
    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/[♙♘].[12]-.+/));

    await clickCorners(page, 'dr', 'dl', 'ul'); // Black pawn from d7

    // After selecting 'from' square, board number should still be "Board 2"
    expect(await getTextContent(page, '#boardNumber')).toBe('Board 2');

    await clickCorners(page, 'dr', 'ul', 'ul'); // to d5

    // After completing the move, it should switch back to Board 1
    await page.waitForFunction(() => document.getElementById('boardNumber')?.textContent === 'Board 1');
  });

  test('displayLastMoveString should update correctly for standard moves', async ({ page }) => {
    await startGame(page); // Start a single board game (player white)

    // Initial state: last move string should be empty
    let lastMoveString = await getTextContent(page, '#lastMoves');
    expect(lastMoveString).toBe('');

    await clickCorners(page, 'dr', 'dl', 'ul'); // White pawn from e2

    lastMoveString = await getTextContent(page, '#lastMoves');
    // After selecting 'from' square, it should show the piece and origin
    expect(lastMoveString).toMatch(/♙e2-\?/); // Assuming pawn icon and e2-?

    await clickCorners(page, 'dr', 'ul', 'ul'); // to e4

    // Even a few milliseconds after the move, it should show the move notation
    await delay(100)
    lastMoveString = await getTextContent(page, '#lastMoves');
    expect(lastMoveString).toMatch(/♙e2-e4/);

    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/[♟♞].[78]-.+/));
  });

  test('displayLastMoveString should be empty after undoing the first move in a single board game', async ({ page }) => {
    await startGame(page);

    // Make a move
    await clickCorners(page, 'dr', 'dl', 'ul'); // from e2
    await clickCorners(page, 'dr', 'ul', 'ul'); // to e4

    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/♙e2-e4/));

    await page.click('#undoMoveBtn');

    // After undoing, the last move string should be empty
    const lastMoveString = await getTextContent(page, '#lastMoves');
    expect(lastMoveString).toBe('');
  });

  test('cancelSelectionBtn should clear selection and, if first move of white, clear last move string', async ({ page }) => {
    await startGame(page);

    // Select the from square
    await clickCorners(page, 'dr', 'dl', 'ul'); // from e2

    expect(await getTextContent(page, '#lastMoves')).toBe('♙e2-?');
    expect(await page.locator('#selectionPreview div').count()).toBeGreaterThan(1);

    await page.click('#cancelSelectionBtn');

    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent == '');
    expect(await page.locator('#selectionPreview div').count()).toBe(1);
  });

  test('cancelSelectionBtn should clear selection and, if not first move, display last opponent move string', async ({ page }) => {
    await page.selectOption('#colorSelect', 'black');
    await startGame(page);
    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/[♙♘].[12]-.+/));
    const opponentLastMove = await getTextContent(page, '#lastMoves');

    // Select the from square
    await clickCorners(page, 'dr', 'dl', 'ul'); // from d7

    expect(await getTextContent(page, '#lastMoves')).toBe('♟d7-?');
    expect(await page.locator('#selectionPreview div').count()).toBeGreaterThan(1);

    await page.click('#cancelSelectionBtn');

    await page.waitForFunction((x) => document.getElementById('lastMoves')?.textContent == x, opponentLastMove);

    expect(await page.locator('#selectionPreview div').count()).toBe(1);
  });

  test('displayLastMoveString should reflect promotion to queen - case: the setting [alwaysQueen] is checked', async ({ page }) => {
    await startGame(page);

    await page.evaluate(() => {
        // Manipulate the game state to set up a promotion scenario (e.g., white pawn on g7)
        window.blindfoldchess_games[0].load('8/6P1/8/1k2K3/8/8/8/8 w - - 0 1');
    });

    // Make the promotion move: g7-g8
    await clickCorner(page, 'ur');
    await clickCorner(page, 'ur');
    await clickCorner(page, 'dl'); // from g7

    await clickCorner(page, 'ur');
    await clickCorner(page, 'ur');
    await clickCorner(page, 'ul'); // to g8 (This will trigger promotion to queen because 'alwaysQueen' is checked by default)

    const lastMoveString = await getTextContent(page, '#lastMoves');
    expect(lastMoveString).toMatch(/♙g7-g8=♕/);
  });

  test('updateSelectionPreview should show promotion choices during promotion pending', async ({ page }) => {
    // Disable 'alwaysQueen' for this test to trigger promotion choice
    await page.evaluate(() => {
      const alwaysQueenCheckbox = document.getElementById('alwaysQueen') as HTMLInputElement;
      if (alwaysQueenCheckbox) {
        alwaysQueenCheckbox.checked = false;
      }
    });
    await startGame(page);

    await page.evaluate(() => {
        // Manipulate the game state to set up a promotion scenario (e.g., white pawn on g7)
        window.blindfoldchess_games[0].load('8/6P1/2k5/8/8/2K5/8/8 w - - 0 1'); // One white pawn and two kings.
    });

    // Make the promotion move: g7-g8
    await clickCorners(page, 'ur', 'ur', 'dl'); // from g7
    await clickCorners(page, 'ur', 'ur', 'ul'); // to g8

    // Expect promotion choices to be visible
    expect(await isVisible(page, '#ul.show-icon span')).toBe(true);
    expect(await isVisible(page, '#ur.show-icon span')).toBe(true);
    expect(await isVisible(page, '#dl.show-icon span')).toBe(true);
    expect(await isVisible(page, '#dr.show-icon span')).toBe(true);
    expect(await getTextContent(page, '#ul.show-icon span')).toBe('♕');
    expect(await getTextContent(page, '#ur.show-icon span')).toBe('♖');
    expect(await getTextContent(page, '#dl.show-icon span')).toBe('♗');
    expect(await getTextContent(page, '#dr.show-icon span')).toBe('♘');

    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/♙g7-g8=?/));

    // Selection preview should be empty during promotion selection
    const selectionPreviewContainer = page.locator('#selectionPreview');
    const divCount = await selectionPreviewContainer.locator('div').count();
    expect(divCount).toBe(0);

    await clickCorner(page, 'ur'); // Rook chosen
    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/♙g7-g8=♖/));
    await delay(200);
    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/♙g7-g8=♖/));

    // Black king moves
    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/♚c6-[b-d][5-7]/));
  });

  test('stays on same board and does not mention the board number anymore if all other games are ended (so the opponent makes a move immediately after the user\'s move)', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'This test works in Chromium only.');
    const interceptedAudioRequests: string[] = [];
    await page.route('**/*.mp3', route => {
      const filename = route.request().url().split('/').pop()!;
      interceptedAudioRequests.push(filename.split('.')[0]);
      route.continue();
    });
    await page.selectOption('#boardsSelect', '2');
    await startGame(page);

    await page.waitForFunction(() => window.blindfoldchess_games && window.blindfoldchess_games.length === 2);

    await page.evaluate(() => {
        // Board 1: Playable FEN (White to move)
        window.blindfoldchess_games[0].load('4r3/8/2k5/8/8/2K5/4R3/8 w - - 0 1');
        // Board 2: Drawn game FEN (Insufficient material for checkmate - two kings and a bishop)
        window.blindfoldchess_games[1].load('8/8/2k5/8/8/2K5/4B3/8 w - - 0 1');
    });

    // Verify initial board number is Board 1
    expect(await getTextContent(page, '#boardNumber')).toBe('Board 1');
    await waitFor(() => interceptedAudioRequests.length == 2);
    expect(interceptedAudioRequests).toEqual([
      'board',
      '1'
    ]);
    interceptedAudioRequests.length = 0;

    // Make a move on Board 1 (White's Rook from e2 takes e8 - assuming default orientation for white)
    await clickCorners(page, 'dr', 'dl', 'ul'); // From e2 (assuming white's perspective)
    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent == '♖e2-?');

    await waitFor(() => interceptedAudioRequests.length == 5);
    expect(interceptedAudioRequests).toEqual([
      'white', 
      'rook', 
      'from', 
      'e', 
      '2'
    ]);
    interceptedAudioRequests.length = 0;
    await delay(50);
    await clickCorners(page, 'ur', 'ul', 'ul'); // takes e8
    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent == '♖e2xe8');
    await waitFor(() => interceptedAudioRequests.length > 2);
    expect(interceptedAudioRequests.slice(0,3)).toEqual([
      'takes', 
      'e', 
      '8'
    ]);
    
    expect(await getTextContent(page, '#boardNumber')).toBe('Board 1');
    await page.waitForFunction(() => document.getElementById('lastMoves')?.textContent?.match(/♚c6-[b-d][5-7]/));
    expect(await getTextContent(page, '#boardNumber')).toBe('Board 1');
    await waitFor(() => interceptedAudioRequests.includes('black') && interceptedAudioRequests.includes('king'));
    expect(interceptedAudioRequests).not.toContain('board');
  });
});