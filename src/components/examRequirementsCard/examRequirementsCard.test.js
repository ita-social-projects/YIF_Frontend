import React from 'react';
import { render, screen } from '@testing-library/react';
import ExamRequirementsCard from '.';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Tab', () => {
  test('render and work', () => {
    let examRequirementsCard = {
      examRequirements: [
        { examName: 'Українська мова', minimumScore: 130, coefficient: 0.3 },
        { examName: 'Математика', minimumScore: 180, coefficient: 0.5 },
        { examName: 'Фізика', minimumScore: 110, coefficient: 0.2 },
      ],
      card__content: 'card__content',
      card__content__line: 'card__content__line',
      card__content__line_title: 'card__content__line_title',
      card__content_title: 'card__content_title',
    };

    let {
      examRequirements,
      card__content,
      card__content__line,
      card__content__line_title,
      card__content_title,
    } = examRequirementsCard;
    render(
      <ExamRequirementsCard
        examRequirements={examRequirements}
        card__content={card__content}
        card__content__line={card__content__line}
        card__content__line_title={card__content__line_title}
        card__content_title={card__content_title}
      />
    );
    expect(screen.getByText('Українська мова')).toBeInTheDocument();
  });
});
