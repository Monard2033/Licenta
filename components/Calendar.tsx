'use client'
import React from "react";
import {RangeCalendar, Radio, RadioGroup, Button, ButtonGroup, cn} from "@nextui-org/react";
import type {DateValue} from "@react-types/calendar";
import type {RangeValue} from "@react-types/shared";
import {today, getLocalTimeZone, startOfWeek, startOfMonth , endOfMonth , endOfWeek , } from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";

export default function Calendar() {
    let [value, setValue] = React.useState<RangeValue<DateValue>>({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({weeks: 1, days: 3}),
    });

    let [focusedValue, setFocusedValue] = React.useState<DateValue>(today(getLocalTimeZone()));

    let {locale} = useLocale();

    let now = today(getLocalTimeZone());
    let nextMonth = now.add({months: 1});

    let nextWeek = {
        start: startOfWeek(now.add({weeks: 1}), locale),
        end: endOfWeek(now.add({weeks: 1}), locale),
    };
    let thisMonth = {start: startOfMonth(now), end: endOfMonth(now)};
    let nextMonthValue = {start: startOfMonth(nextMonth), end: endOfMonth(nextMonth)};


    const CustomRadio = (props: any) => {
        const {children, ...otherProps} = props;

        return (
            <Radio
                {...otherProps}
                classNames={{
                    base: cn(
                        "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
                        "cursor-pointer rounded-full border-2 border-default-200/60",
                        "data-[selected=true]:border-primary",
                    ),
                    label: "text-tiny text-default-500",
                    labelWrapper: "px-1 m-0",
                    wrapper: "hidden",
                }}
            >
                {children}
            </Radio>
        );
    };

    return (
        <div className="flex flex-col gap-6">
            <RangeCalendar
                focusedValue={focusedValue}
                nextButtonProps={{
                    variant: "bordered",
                }}
                prevButtonProps={{
                    variant: "bordered",
                }}

                value={value}
                onChange={setValue}
                onFocusChange={setFocusedValue}
            />
        </div>
    );
}

