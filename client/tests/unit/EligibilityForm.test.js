import { jsx as _jsx } from "react/jsx-runtime";
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EligibilityForm } from '../../src/components/EligibilityForm';
import { useJourneyStore } from '../../src/store/journeyStore';
// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();
describe('EligibilityForm', () => {
    beforeEach(() => {
        useJourneyStore.getState().reset();
    });
    test('AC1: age 17 shows not-eligible, stage stays 1', async () => {
        render(_jsx(EligibilityForm, {}));
        const user = userEvent.setup();
        const ageInput = screen.getByLabelText('Your Age');
        await user.type(ageInput, '17');
        const radioNo = screen.getByLabelText("No, I don't");
        await user.click(radioNo);
        const submitBtn = screen.getByRole('button', { name: /Check My Eligibility/i });
        expect(submitBtn).not.toBeDisabled();
        await user.click(submitBtn);
        await waitFor(() => {
            expect(screen.getByRole('status')).toHaveTextContent(/not yet eligible/i);
        });
        expect(useJourneyStore.getState().stage).toBe(1);
    });
    test('AC2: age 25 + hasId=no advances stage to 2', async () => {
        render(_jsx(EligibilityForm, {}));
        const user = userEvent.setup();
        const ageInput = screen.getByLabelText('Your Age');
        await user.type(ageInput, '25');
        const radioNo = screen.getByLabelText("No, I don't");
        await user.click(radioNo);
        const submitBtn = screen.getByRole('button', { name: /Check My Eligibility/i });
        await user.click(submitBtn);
        await waitFor(() => {
            expect(screen.getByRole('status')).toHaveTextContent(/eligible to vote/i);
            expect(screen.getByRole('status')).toHaveTextContent(/Register/i);
        });
        expect(useJourneyStore.getState().stage).toBe(2);
    });
    test('submit disabled until form is valid', async () => {
        render(_jsx(EligibilityForm, {}));
        const user = userEvent.setup();
        const submitBtn = screen.getByRole('button', { name: /Check My Eligibility/i });
        expect(submitBtn).toBeDisabled();
        const ageInput = screen.getByLabelText('Your Age');
        await user.type(ageInput, '25');
        expect(submitBtn).toBeDisabled();
        const radioYes = screen.getByLabelText('Yes, I have one');
        await user.click(radioYes);
        await waitFor(() => {
            expect(submitBtn).not.toBeDisabled();
        });
    });
    test('age 18 is eligible boundary', async () => {
        render(_jsx(EligibilityForm, {}));
        const user = userEvent.setup();
        const ageInput = screen.getByLabelText('Your Age');
        await user.type(ageInput, '18');
        const radioYes = screen.getByLabelText('Yes, I have one');
        await user.click(radioYes);
        const submitBtn = screen.getByRole('button', { name: /Check My Eligibility/i });
        await user.click(submitBtn);
        await waitFor(() => {
            expect(screen.getByRole('status')).toHaveTextContent(/already registered/i);
        });
        expect(useJourneyStore.getState().stage).toBe(2);
    });
});
