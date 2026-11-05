import { test, expect } from '@playwright/test';

test.describe('LPH UIN SGD Website Visual & Functional Tests', () => {
  test('Beranda renders properly with navbar and hero', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LPH UIN Sunan Gunung Djati/);
    await expect(page.locator('#navbar')).toBeVisible();
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#floating-whatsapp')).toBeVisible();
  });

  test('Berita page renders and filters categories', async ({ page }) => {
    await page.goto('/berita');
    await expect(page.getByRole('heading', { name: /Berita, Agenda & Acara/i })).toBeVisible();
    await expect(page.getByText('Semua Kategori')).toBeVisible();
  });

  test('Pengumuman page renders', async ({ page }) => {
    await page.goto('/pengumuman');
    await expect(page.getByRole('heading', { name: /Pengumuman Resmi/i })).toBeVisible();
  });

  test('Kalkulator Harga performs calculation and displays savings', async ({ page }) => {
    await page.goto('/layanan/kalkulator-harga');
    await expect(page.getByRole('heading', { name: /Kalkulator Tarif/i })).toBeVisible();
    await page.getByRole('button', { name: /Hitung Estimasi Biaya/i }).click();
    await expect(page.getByText(/KEUNTUNGAN DI LPH UIN SGD/i)).toBeVisible();
  });

  test('QnA page handles AI queries', async ({ page }) => {
    await page.goto('/layanan/qna');
    await expect(page.getByRole('heading', { name: /Tanya Jawab Halal/i })).toBeVisible();
  });

  test('Kepuasan Pelanggan form renders', async ({ page }) => {
    await page.goto('/layanan/kepuasan-pelanggan');
    await expect(page.getByRole('heading', { name: /Survei Kepuasan Pelanggan/i })).toBeVisible();
  });

  test('Pengaduan page renders form and ticket check tabs', async ({ page }) => {
    await page.goto('/layanan/pengaduan');
    await expect(page.getByRole('heading', { name: /Pusat Pengaduan/i })).toBeVisible();
    await expect(page.getByText(/Cek Status Tiket/i)).toBeVisible();
  });

  test('Kontak page renders address and map', async ({ page }) => {
    await page.goto('/kontak');
    await expect(page.getByRole('heading', { name: /Hubungi Kantor Kami/i })).toBeVisible();
  });

  test('Admin Login renders securely', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.getByRole('heading', { name: /Portal Petugas Admin/i })).toBeVisible();
  });
});

