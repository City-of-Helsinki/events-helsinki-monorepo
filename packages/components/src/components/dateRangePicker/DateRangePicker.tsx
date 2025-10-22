import { isBefore, isValid as isValidDate } from 'date-fns';
import { fi, sv } from 'date-fns/locale';
import { DateInput } from 'hds-react';
import React from 'react';
import { registerLocale } from 'react-datepicker';
import useCommonTranslation from '../../hooks/useCommonTranslation';
import useLocale from '../../hooks/useLocale';

import { formatDate, isValidDateString, parseDate } from '../../utils';
import styles from './datePicker.module.scss';

registerLocale('fi', fi);
registerLocale('sv', sv);

const initDate = (date: Date | null): string => {
  return date ? formatDate(date) : '';
};

export interface DateRangePickerProps {
  endDate: Date | null;
  startDate: Date | null;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  startDateInputRef?: React.MutableRefObject<HTMLInputElement | null>;
  endDateInputRef?: React.MutableRefObject<HTMLInputElement | null>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  endDate,
  startDate,
  onChangeEndDate,
  onChangeStartDate,
  startDateInputRef,
  endDateInputRef,
}) => {
  const [internalStartDateString, setInternalStartDateString] =
    React.useState<string>(() => initDate(startDate));
  const [internalEndDateString, setInternalEndDateString] =
    React.useState<string>(() => initDate(endDate));
  const [errors, setErrors] = React.useState({
    startDateIsInvalid: false,
    endDateIsInvalid: false,
  });

  const { t } = useCommonTranslation();
  const locale = useLocale();
  const helperText = t('common:dateSelector.infoDate');

  const internalStartDate = parseDate(internalStartDateString);
  const internalEndDate = parseDate(internalEndDateString);

  const endDateIsBeforeStartDate = Boolean(
    isValidDate(internalStartDate) &&
      isValidDate(internalEndDate) &&
      isBefore(internalEndDate, internalStartDate)
  );

  React.useEffect(() => {
    if (!startDate && !endDate) {
      setInternalStartDateString('');
      setInternalEndDateString('');
    }
  }, [startDate, endDate]);

  React.useEffect(() => {
    const startDateIsValid = isValidDateString(internalStartDateString);
    const endDateIsValid = isValidDateString(internalEndDateString);
    const startDateObj = parseDate(internalStartDateString);
    const endDateObj = parseDate(internalEndDateString);

    if (
      startDateIsValid &&
      endDateIsValid &&
      isBefore(endDateObj, startDateObj)
    ) {
      onChangeStartDate(startDateObj);
      onChangeEndDate(null);
      return;
    }

    if (startDateIsValid) {
      setErrors({
        ...errors,
        startDateIsInvalid: false,
      });
    }

    if (endDateIsValid) {
      setErrors({
        ...errors,
        endDateIsInvalid: false,
      });
    }

    if (startDateIsValid) {
      onChangeStartDate(parseDate(internalStartDateString));
    } else {
      onChangeStartDate(null);
    }

    if (endDateIsValid) {
      onChangeEndDate(parseDate(internalEndDateString));
    } else {
      onChangeEndDate(null);
    }

    // ignore change handlers to avoid infinite loops (if func changes on every render)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalStartDateString, internalEndDateString, setErrors]);

  const handleStartDateValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      startDateIsInvalid: !isValidDateString(e.target.value),
    });
  };

  const handleEndDateValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      endDateIsInvalid: !isValidDateString(e.target.value),
    });
  };

  const endDateIsInvalidText = errors.endDateIsInvalid
    ? t('common:dateSelector.errorDateFormat')
    : undefined;

  const errorText = endDateIsBeforeStartDate
    ? t('common:dateSelector.errorEndDateBeforeStartDate')
    : endDateIsInvalidText;

  return (
    <div className={styles.dateInputsContainer}>
      <DateInput
        // FIXME: The date picker button should have
        // `aria-expanded="true" aria-haspopup="menu" and focus should be set to opened calendar.
        // These should be fixed in HDS component.`
        ref={startDateInputRef}
        autoComplete="off"
        id="start-date"
        value={internalStartDateString}
        onBlur={handleStartDateValidation}
        disableConfirmation
        helperText={!errors.startDateIsInvalid ? helperText : undefined}
        minDate={new Date()}
        initialMonth={new Date()}
        label={t('common:dateSelector.labelStartDate')}
        language={locale}
        onChange={(date) => setInternalStartDateString(date)}
        errorText={
          errors.startDateIsInvalid
            ? t('common:dateSelector.errorDateFormat')
            : undefined
        }
      />
      <DateInput
        // FIXME: The date picker button should have
        // `aria-expanded="true" aria-haspopup="menu" and focus should be set to opened calendar.
        // These should be fixed in HDS component.`
        ref={endDateInputRef}
        autoComplete="off"
        id="end-date"
        value={internalEndDateString}
        onBlur={handleEndDateValidation}
        disableConfirmation
        helperText={
          !endDateIsBeforeStartDate && !errors.endDateIsInvalid
            ? helperText
            : undefined
        }
        minDate={new Date()}
        initialMonth={startDate ?? new Date()}
        label={t('common:dateSelector.labelEndDate')}
        language={locale}
        onChange={(date) => setInternalEndDateString(date)}
        errorText={errorText}
      />
    </div>
  );
};

export default DateRangePicker;
