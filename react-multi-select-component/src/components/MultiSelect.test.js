import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MultiSelect from './MultiSelect';

const options = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'];

describe('MultiSelect component', () => {

    test('should render the component', () => {
        render(<MultiSelect options={options} />);
        const input = screen.getByPlaceholderText('Select...');
        expect(input).toBeInTheDocument();
    });


    test('should remove one option when the close button of the option is clicked', () => {
    render(<MultiSelect options={options} />);
    const input = screen.getByPlaceholderText('Select...');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'banana' } });

    const option = screen.getByText('Banana');
    fireEvent.click(option);

    const closeButton = screen.getByAltText('delete');
    fireEvent.click(closeButton);

    expect(screen.queryByText<HTMLElement>('Banana')).toBeFalsy();
    });

    test('should remove all options when the delete all button is clicked', () => {
        render(<MultiSelect options={options} />);
        const input = screen.getByPlaceholderText('Select...');
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'a' } });
        const appleOption = screen.getByText('Apple');
        fireEvent.click(appleOption);
        const bananaOption = screen.getByText('Banana');
        fireEvent.click(bananaOption);
        const deleteAllButton = screen.getByAltText('delete-all');
        fireEvent.click(deleteAllButton);
        expect(screen.queryByText<HTMLElement>('Apple')).toBeFalsy();
        expect(screen.queryByText<HTMLElement>('Banana')).toBeFalsy()
    });
    
    

    test('should toggle the options menu when the toggle button is clicked', () => {
    render(<MultiSelect options={options} />);
    const toggleButton = screen.getByAltText('arrow-down');

    fireEvent.click(toggleButton);
    expect(screen.getByText('Apple')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
})