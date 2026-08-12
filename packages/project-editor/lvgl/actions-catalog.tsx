import React from "react";
import { IActionPropertyDefinition, registerAction } from "./actions";
import {
    LV_BUTTONMATRIX_CTRL_ENUM_NAME,
    LV_OBJ_FLAG_ENUM_NAME,
    LV_PART_ENUM_NAME,
    LV_SCR_LOAD_ANIM_ENUM_NAME,
    LV_STATE_ENUM_NAME
} from "./lvgl-constants";
import { registerLvglEnum } from "./widgets";
import { RightArrow } from "project-editor/ui-components/icons";
import type { Project } from "project-editor/project/project";
import { t } from "eez-studio-shared/i18n";

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 0,
    name: "changeScreen",
    group: "Screen",
    properties: [
        {
            name: "screen",
            type: "screen",
            helpText: t("The screen to change to")
        },
        {
            name: "fadeMode",
            type: `enum:${LV_SCR_LOAD_ANIM_ENUM_NAME}`,
            helpText: t(
                "Selection of animation when moving from the previous page to a new page"
            )
        },
        {
            name: "speed",
            type: "integer",
            helpText: t("Animation duration in milliseconds")
        },
        {
            name: "delay",
            type: "integer",
            helpText: t("Delay in milliseconds before the animation starts.")
        },
        {
            name: "useStack",
            type: "boolean",
            helpText: t("Put active screen on the stack.")
        }
    ],
    defaults: {
        fadeMode: "FADE_IN",
        speed: 200,
        delay: 0,
        useStack: true
    },
    label: (
        [screen, fadeMode, speed, delay, useStack],
        [_1, _2, speedLabel, delayLabel, useStackLabel]
    ) => (
        <>
            {screen} {fadeMode} <i>{speedLabel}</i>={speed} <i>{delayLabel}</i>=
            {delay}
            {useStack !== "ON" && (
                <>
                    <i> {useStackLabel}</i>={useStack}
                </>
            )}
        </>
    ),
    helpText: t("Change the screen to the specified screen")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 1,
    name: "changeToPreviousScreen",
    group: "Screen",
    properties: [
        {
            name: "fadeMode",
            type: `enum:${LV_SCR_LOAD_ANIM_ENUM_NAME}`,
            helpText: t(
                "Selection of animation when moving from the previous page to a new page"
            )
        },
        {
            name: "speed",
            type: "integer",
            helpText: t("Animation duration in milliseconds")
        },
        {
            name: "delay",
            type: "integer",
            helpText: t("Delay in milliseconds before the animation starts.")
        }
    ],
    defaults: {
        fadeMode: "FADE_IN",
        speed: 200,
        delay: 0
    },
    label: ([fadeMode, speed, delay], [_, speedLabel, delayLabel]) => (
        <>
            {fadeMode} <i>{speedLabel}</i>={speed} <i>{delayLabel}</i>={delay}
        </>
    ),
    helpText: t("Change to the previous screen")
});

const SCREENS_LIFETIME_SUPPORT_DISABLED_MESSAGE = (action: string) =>
    t(
        "'{action}' action is not available if 'Screens lifetime support' is not enabled in Settings - Build",
        { action }
    );

registerAction({
    id: 47,
    name: "createScreen",
    group: "Screen",
    properties: [
        {
            name: "screen",
            type: "screen",
            helpText: t("The screen to create")
        }
    ],
    defaults: {},
    label: ([screen]) => <>{screen}</>,
    helpText: t(
        `Create the screen ("Screens lifetime support" should be enabled in Settings - Build)`
    ),
    disabled: (project: Project) =>
        project.settings.build.screensLifetimeSupport
            ? false
            : SCREENS_LIFETIME_SUPPORT_DISABLED_MESSAGE("Create Screen")
});

registerAction({
    id: 48,
    name: "deleteScreen",
    group: "Screen",
    properties: [
        {
            name: "screen",
            type: "screen",
            helpText: t("The screen to delete")
        }
    ],
    defaults: {},
    label: ([screen]) => <>{screen}</>,
    helpText: t(
        `Delete the screen ("Screens lifetime support" should be enabled in Settings - Build)`
    ),
    disabled: (project: Project) =>
        project.settings.build.screensLifetimeSupport
            ? false
            : SCREENS_LIFETIME_SUPPORT_DISABLED_MESSAGE("Delete Screen")
});

registerAction({
    id: 49,
    name: "isScreenCreated",
    group: "Screen",
    properties: [
        {
            name: "screen",
            type: "screen",
            helpText: t("The screen")
        },
        {
            name: "result",
            type: "boolean",
            isAssignable: true,
            helpText: t("The boolean variable where to store the screen status")
        }
    ],
    defaults: {},
    label: ([screen, result]) => (
        <>
            <>
                {screen}
                <RightArrow />
                {result}
            </>
        </>
    ),
    helpText: t(
        `Check if screen is created ("Screens lifetime support" should be enabled in Settings - Build)`
    ),
    disabled: (project: Project) =>
        project.settings.build.screensLifetimeSupport
            ? false
            : SCREENS_LIFETIME_SUPPORT_DISABLED_MESSAGE("Is Screen Created")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 2,
    name: "objSetX",
    group: t("Widget - Position and Size"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to set the x coordinate")
        },
        {
            name: "x",
            type: "integer",
            helpText: t("The x coordinate to set")
        }
    ],
    defaults: {},
    label: ([object, x]) => (
        <>
            {object} {x}
        </>
    ),
    helpText: t("Set the x coordinate of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 3,
    name: "objGetX",
    group: t("Widget - Position and Size"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to get the x coordinate")
        },
        {
            name: "result",
            type: "integer",
            isAssignable: true,
            helpText: t("The variable to store the x coordinate")
        }
    ],
    defaults: {},
    label: ([object, width]) => (
        <>
            {object}
            <RightArrow />
            {width}
        </>
    ),
    helpText: t("Get the x coordinate of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 4,
    name: "objSetY",
    group: t("Widget - Position and Size"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to set the y coordinate")
        },
        {
            name: "y",
            type: "integer",
            helpText: t("The y coordinate to set")
        }
    ],
    defaults: {},
    label: ([object, y]) => (
        <>
            {object} {y}
        </>
    ),
    helpText: t("Set the y coordinate of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 5,
    name: "objGetY",
    group: t("Widget - Position and Size"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to get the y coordinate")
        },
        {
            name: "result",
            type: "integer",
            isAssignable: true,
            helpText: t("The variable to store the y coordinate")
        }
    ],
    defaults: {},
    label: ([object, width]) => (
        <>
            {object}
            <RightArrow />
            {width}
        </>
    ),
    helpText: t("Get the y coordinate of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 63,
    name: "objGetDisplayX",
    group: t("Widget - Position and Size"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to get the x coordinate")
        },
        {
            name: "result",
            type: "integer",
            isAssignable: true,
            helpText: t("The variable to store the x coordinate")
        }
    ],
    defaults: {},
    label: ([object, width]) => (
        <>
            {object}
            <RightArrow />
            {width}
        </>
    ),
    helpText: t("Get the x coordinate of the object, relative to the display origin")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 64,
    name: "objGetDisplayY",
    group: t("Widget - Position and Size"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to get the y coordinate")
        },
        {
            name: "result",
            type: "integer",
            isAssignable: true,
            helpText: t("The variable to store the y coordinate")
        }
    ],
    defaults: {},
    label: ([object, width]) => (
        <>
            {object}
            <RightArrow />
            {width}
        </>
    ),
    helpText: t("Get the y coordinate of the object, relative to the display origin")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 6,
    name: "objSetWidth",
    group: t("Widget - Position and Size"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to set the width")
        },
        {
            name: "width",
            type: "integer",
            helpText: t("The width to set")
        }
    ],
    defaults: {},
    label: ([object, width]) => (
        <>
            {object} {width}
        </>
    ),
    helpText: t("Set the width of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 7,
    name: "objGetWidth",
    group: t("Widget - Position and Size"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to get the width")
        },
        {
            name: "result",
            type: "integer",
            isAssignable: true,
            helpText: t("The variable to store the width")
        }
    ],
    defaults: {},
    label: ([object, width]) => (
        <>
            {object}
            <RightArrow />
            {width}
        </>
    ),
    helpText: t("Get the width of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 8,
    name: "objSetHeight",
    group: t("Widget - Position and Size"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to set the height")
        },
        {
            name: "height",
            type: "integer",
            helpText: t("The height to set")
        }
    ],
    defaults: {},
    label: ([object, height]) => (
        <>
            {object} {height}
        </>
    ),
    helpText: t("Set the height of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 9,
    name: "objGetHeight",
    group: t("Widget - Position and Size"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to get the height")
        },
        {
            name: "result",
            type: "integer",
            isAssignable: true,
            helpText: t("The variable to store the height")
        }
    ],
    defaults: {},
    label: ([object, width]) => (
        <>
            {object}
            <RightArrow />
            {width}
        </>
    ),
    helpText: t("Get the height of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 59,
    name: "objStyleSetProperty",
    displayName: t("Set Obj Style Prop"),
    group: t("Widget - Styles"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("Widget")
        },
        {
            name: "property",
            type: "style-property",
            helpText: t("The style property to set")
        },
        {
            name: "value",
            type: "style-value",
            helpText: t("The value to set for the property")
        },
        {
            name: "part",
            type: `enum:${LV_PART_ENUM_NAME}`,
            helpText: t("The part of the object to set the property")
        },
        {
            name: "state",
            type: `enum:${LV_STATE_ENUM_NAME}`,
            helpText: t("The state of the object to set the property")
        }
    ],
    defaults: {
        part: "MAIN",
        state: "DEFAULT"
    },
    label: ([object, property, value, part, state]) => (
        <>
            {object} "{property}" {value ?? "?"}{part != "MAIN" ? ` ${part}` : ""}{state != "DEFAULT" ? ` ${state}` : ""}
        </>
    ),
    helpText: t("Set the value of property in a style.")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 10,
    name: "objSetStyleOpa",
    group: t("Widget - Styles"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to set the opacity")
        },
        {
            name: "opacity",
            type: "integer",
            helpText: t("The opacity to set (0-255)")
        }
    ],
    defaults: {},
    label: ([object, opacity]) => (
        <>
            {object} {opacity}
        </>
    ),
    helpText: t("Set the opacity of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 11,
    name: "objGetStyleOpa",
    group: t("Widget - Styles"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to get the opacity")
        },
        {
            name: "result",
            type: "integer",
            isAssignable: true,
            helpText: t("The variable to store the opacity")
        }
    ],
    defaults: {},
    label: ([object, width]) => (
        <>
            {object}
            <RightArrow />
            {width}
        </>
    ),
    helpText: t("Get the opacity of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 12,
    name: "objAddStyle",
    group: t("Widget - Styles"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to add the style")
        },
        {
            name: "style",
            type: "style",
            helpText: t("The style to add")
        }
    ],
    defaults: {},
    label: ([object, style]) => (
        <>
            {object} {style}
        </>
    ),
    helpText: t("Add a style to the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 13,
    name: "objRemoveStyle",
    group: t("Widget - Styles"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to remove the style")
        },
        {
            name: "style",
            type: "style",
            helpText: t("The style to remove")
        }
    ],
    defaults: {},
    label: ([object, style]) => (
        <>
            {object} {style}
        </>
    ),
    helpText: t("Remove a style from the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 14,
    name: "objSetFlagHidden",
    group: t("Widget - Flags"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to set the hidden flag")
        },
        {
            name: "hidden",
            type: "boolean",
            helpText: t("The hidden flag value")
        }
    ],
    defaults: {
        hidden: true
    },
    label: ([object, hidden]) => (
        <>
            {object} {hidden}
        </>
    ),
    helpText: t("Set the hidden flag of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 15,
    name: "objAddFlag",
    group: t("Widget - Flags"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to add the flag")
        },
        {
            name: "flag",
            type: `enum:${LV_OBJ_FLAG_ENUM_NAME}`,
            helpText: t("The flag to add")
        }
    ],
    defaults: {
        flag: "HIDDEN"
    },
    label: ([object, flag]) => (
        <>
            {object} {flag}
        </>
    ),
    helpText: t("Add a flag to the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 16,
    name: "objClearFlag",
    group: t("Widget - Flags"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to clear the flag")
        },
        {
            name: "flag",
            type: `enum:${LV_OBJ_FLAG_ENUM_NAME}`,
            helpText: t("The flag to clear")
        }
    ],
    defaults: {
        flag: "HIDDEN"
    },
    label: ([object, flag]) => (
        <>
            {object} {flag}
        </>
    ),
    helpText: t("Clear a flag from the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 17,
    name: "objHasFlag",
    group: t("Widget - Flags"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to check the flag")
        },
        {
            name: "flag",
            type: `enum:${LV_OBJ_FLAG_ENUM_NAME}`,
            helpText: t("The flag to check")
        },
        {
            name: "result",
            type: `boolean`,
            isAssignable: true,
            helpText: t("The variable to store the result")
        }
    ],
    defaults: {
        flag: "HIDDEN"
    },
    label: ([object, flag, result]) => (
        <>
            {object} {flag}
            <RightArrow />
            {result}
        </>
    ),
    helpText: t("Check if the object has the specified flag")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 18,
    name: "objSetStateChecked",
    group: t("Widget - Flags"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to set the checked state")
        },
        {
            name: "checked",
            type: "boolean",
            helpText: t("The checked state to set")
        }
    ],
    defaults: {
        checked: true
    },
    label: ([object, checked]) => (
        <>
            {object} {checked}
        </>
    ),
    helpText: t("Set the checked state of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 19,
    name: "objSetStateDisabled",
    group: t("Widget - States"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to set the disabled state")
        },
        {
            name: "disabled",
            type: "boolean",
            helpText: t("The disabled state to set")
        }
    ],
    defaults: {
        disabled: true
    },
    label: ([object, disabled]) => (
        <>
            {object} {disabled}
        </>
    ),
    helpText: t("Set the disabled state of the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 20,
    name: "objAddState",
    group: t("Widget - States"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to add the state")
        },
        {
            name: "state",
            type: `enum:${LV_STATE_ENUM_NAME}`,
            helpText: t("The state to add")
        }
    ],
    defaults: {
        state: "CHECKED"
    },
    label: ([object, state]) => (
        <>
            {object} {state}
        </>
    ),
    helpText: t("Add a state to the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 21,
    name: "objClearState",
    group: t("Widget - States"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to clear the state")
        },
        {
            name: "state",
            type: `enum:${LV_STATE_ENUM_NAME}`,
            helpText: t("The state to clear")
        }
    ],
    defaults: {
        state: "CHECKED"
    },
    label: ([object, state]) => (
        <>
            {object} {state}
        </>
    ),
    helpText: t("Clear a state from the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 22,
    name: "objHasState",
    group: t("Widget - States"),
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to check the state")
        },
        {
            name: "state",
            type: `enum:${LV_STATE_ENUM_NAME}`,
            helpText: t("The state to check")
        },
        {
            name: "result",
            type: `boolean`,
            isAssignable: true,
            helpText: t("The variable to store the result")
        }
    ],
    defaults: {
        flag: "HIDDEN"
    },
    label: ([object, state, result]) => (
        <>
            {object} {state}
            <RightArrow />
            {result}
        </>
    ),
    helpText: t("Check if the object has the specified state")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 23,
    name: "arcSetValue",
    group: "Arc",
    properties: [
        {
            name: "object",
            type: "widget:Arc",
            helpText: t("The arc to set the value")
        },
        {
            name: "value",
            type: "integer",
            helpText: t("The value to set")
        }
    ],
    defaults: {},
    label: ([object, value]) => (
        <>
            {object} {value}
        </>
    ),
    helpText: t("Set the value of the arc")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 62,
    name: "arcRotateObjToAngle",
    group: "Arc",
    properties: [
        {
            name: "object",
            type: "widget:Arc",
            helpText: t("The arc object")
        },
        {
            name: "objToRotate",
            type: "widget",
            helpText: t("The object to rotate")
        },
        {
            name: "offset",
            type: "integer",
            helpText: t("Consider the radius larger with this value (< 0: for smaller radius)")
        }
    ],
    defaults: {},
    label: ([object, objToRotate, offset]) => (
        <>
            {object} {objToRotate} {offset}
        </>
    ),
    helpText: t("Rotate an object to the current position of the arc (knob)")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 24,
    name: "barSetValue",
    group: "Bar",
    properties: [
        {
            name: "object",
            type: "widget:Bar",
            helpText: t("The bar to set the value")
        },
        {
            name: "value",
            type: "integer",
            helpText: t("The value to set (0-100)")
        },
        {
            name: "animated",
            type: "boolean",
            helpText: t("Use animation when setting the value")
        }
    ],
    defaults: {
        animated: true
    },
    label: ([object, value, animated], [_1, _2, animatedLabel]) => (
        <>
            {object} {value} <i>{animatedLabel}</i>={animated}
        </>
    ),
    helpText: t("Set the value of the bar")
});

registerAction({
    id: 54,
    name: "buttonMatrixSetButtonCtrl",
    group: "ButtonMatrix",
    properties: [
        {
            name: "object",
            type: "widget:ButtonMatrix",
            helpText: t("The bar to set the value")
        },
        {
            name: "buttonID",
            type: "integer",
            helpText: t(
                "0 based index of the button to modify. (Not counting new lines)"
            )
        },
        {
            name: "ctrl",
            type: `enum:${LV_BUTTONMATRIX_CTRL_ENUM_NAME}`,
            helpText: t(
                "OR-ed attributes. E.g. `LV_BUTTONMATRIX_CTRL.NO_REPEAT | LV_BUTTONMATRIX_CTRL.CHECKABLE`"
            )
        }
    ],
    defaults: {},
    label: ([object, buttonID, ctrl], [_1, _2, _3]) => (
        <>
            {object} {buttonID} {ctrl}
        </>
    ),
    helpText: t("Set the value of the bar")
});

registerAction({
    id: 55,
    name: "buttonMatrixClearButtonCtrl",
    group: "ButtonMatrix",
    properties: [
        {
            name: "object",
            type: "widget:ButtonMatrix",
            helpText: t("The bar to set the value")
        },
        {
            name: "buttonID",
            type: "integer",
            helpText: t(
                "0 based index of the button to modify. (Not counting new lines)"
            )
        },
        {
            name: "ctrl",
            type: `enum:${LV_BUTTONMATRIX_CTRL_ENUM_NAME}`,
            helpText: t(
                "OR-ed attributes. E.g. `LV_BUTTONMATRIX_CTRL.NO_REPEAT | LV_BUTTONMATRIX_CTRL.CHECKABLE`"
            )
        }
    ],
    defaults: {},
    label: ([object, buttonID, ctrl], [_1, _2, _3]) => (
        <>
            {object} {buttonID} {ctrl}
        </>
    ),
    helpText: t("Clear the attributes of a button of the button matrix")
});

registerAction({
    id: 50,
    name: "calendarSetTodayDate",
    group: "Calendar",
    properties: [
        {
            name: "object",
            type: "widget:Calendar",
            helpText: t("The calendar object")
        },
        {
            name: "year",
            type: "integer",
            helpText: t("Today's year")
        },
        {
            name: "month",
            type: "integer",
            helpText: t("Today's month [1..12]")
        },
        {
            name: "day",
            type: "integer",
            helpText: t("Today's day [1..31]")
        }
    ],
    defaults: {},
    label: ([object, year, month, day]) => (
        <>
            <>
                {object} {year} {month} {day}
            </>
        </>
    ),
    helpText: t("Set the today's date")
});

registerAction({
    id: 51,
    name: "calendarSetShowedDate",
    group: "Calendar",
    properties: [
        {
            name: "object",
            type: "widget:Calendar",
            helpText: t("The calendar object")
        },
        {
            name: "year",
            type: "integer",
            helpText: t("Showed year")
        },
        {
            name: "month",
            type: "integer",
            helpText: t("Showed month [1..12]")
        }
    ],
    defaults: {},
    label: ([object, year, month]) => (
        <>
            <>
                {object} {year} {month}
            </>
        </>
    ),
    helpText: t("Set the currently showed")
});

registerAction({
    id: 52,
    name: "calendarSetHighlightedDate",
    group: "Calendar",
    properties: [
        {
            name: "object",
            type: "widget:Calendar",
            helpText: t("The calendar object")
        },
        {
            name: "year",
            type: "integer",
            helpText: t("Highlight year")
        },
        {
            name: "month",
            type: "integer",
            helpText: t("Highlight month [1..12]")
        },
        {
            name: "day",
            type: "integer",
            helpText: t("Hilighy day [1..31]")
        }
    ],
    defaults: {},
    label: ([object, year, month]) => (
        <>
            <>
                {object} {year} {month}
            </>
        </>
    ),
    helpText: t("Set the highlighted date")
});

registerAction({
    id: 53,
    name: "calendarGetPressedDate",
    group: "Calendar",
    properties: [
        {
            name: "object",
            type: "widget:Calendar",
            helpText: t("The calendar object")
        },
        {
            name: "year",
            type: "integer",
            isAssignable: true,
            helpText: t("The integer variable where to store the year")
        },
        {
            name: "month",
            type: "integer",
            isAssignable: true,
            helpText: t("The integer variable where to store the month (1..12)")
        },
        {
            name: "day",
            type: "integer",
            isAssignable: true,
            helpText: t("The integer variable where to store the day (1..31)")
        }
    ],
    defaults: {},
    label: ([object, year, month, day]) => (
        <>
            <>
                {object}
                <RightArrow />
                {year} {month} {day}
            </>
        </>
    ),
    helpText: t("Get the currently pressed day")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 25,
    name: "dropdownSetSelected",
    group: "Dropdown",
    properties: [
        {
            name: "object",
            type: "widget:Dropdown",
            helpText: t("The dropdown to set the selected item")
        },
        {
            name: "selected",
            type: "integer",
            helpText: t("The index of the selected item")
        }
    ],
    defaults: {},
    label: ([object, selected]) => (
        <>
            {object} {selected}
        </>
    ),
    helpText: t("Set the selected item of the dropdown")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 26,
    name: "imageSetSrc",
    group: "Image",
    properties: [
        {
            name: "object",
            type: "widget:Image",
            helpText: t("The image to set the source")
        },
        {
            name: "src",
            type: "image",
            helpText: t("The source image to set given as a string")
        }
    ],
    defaults: {},
    label: ([object, src]) => (
        <>
            {object} {src}
        </>
    ),
    helpText: t("Set the source image of the image")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 27,
    name: "imageSetAngle",
    group: "Image",
    properties: [
        {
            name: "object",
            type: "widget:Image",
            helpText: t("The image to set the angle")
        },
        {
            name: "angle",
            type: "integer",
            helpText: t(
                "The angle to set. Angle has 0.1 degree precision, so for 45.8° set 458."
            )
        }
    ],
    defaults: {},
    label: ([object, angle]) => (
        <>
            {object} {angle}
        </>
    ),
    helpText: t("Set the angle of the image")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 28,
    name: "imageSetZoom",
    group: "Image",
    properties: [
        {
            name: "object",
            type: "widget:Image",
            helpText: t("The image to set the zoom")
        },
        {
            name: "zoom",
            type: "integer",
            helpText: t(
                "The zoom to set. Set factor to 256 to disable zooming. A larger value enlarges the images (e.g. 512 double size), a smaller value shrinks it (e.g. 128 half size)."
            )
        }
    ],
    defaults: {},
    label: ([object, zoom]) => (
        <>
            {object} {zoom}
        </>
    ),
    helpText: t("Set the zoom of the image")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 32,
    name: "keyboardSetTextarea",
    group: "Keyboard",
    properties: [
        {
            name: "object",
            type: "widget:Keyboard",
            helpText: t("The keyboard to set the textarea")
        },
        {
            name: "textarea",
            type: "widget:Textarea",
            helpText: t("The textarea to set")
        }
    ],
    defaults: {},
    label: ([object, textarea]) => (
        <>
            {object} {textarea}
        </>
    ),
    helpText: t("Set the textarea for the keyboard")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 29,
    name: "labelSetText",
    group: "Label",
    properties: [
        {
            name: "object",
            type: "widget:Label",
            helpText: t("The label to set the text")
        },
        {
            name: "text",
            type: "string",
            helpText: t("The text to set")
        }
    ],
    defaults: {},
    label: ([object, text]) => (
        <>
            {object} {text}
        </>
    ),
    helpText: t("Set the text of the label")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 58,
    name: "qrCodeUpdate",
    displayName: t("QR code update"),
    group: "QRCode",
    properties: [
        {
            name: "object",
            type: "widget:QRCode",
            helpText: t("QR code widget")
        },
        {
            name: "text",
            type: "string",
            helpText: t("The text to display")
        }
    ],
    defaults: {},
    label: ([object, text]) => (
        <>
            {object} {text}
        </>
    ),
    helpText: t("Set the text of a QR code object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 30,
    name: "rollerSetSelected",
    group: "Roller",
    properties: [
        {
            name: "object",
            type: "widget:Roller",
            helpText: t("The roller to set the selected item")
        },
        {
            name: "selected",
            type: "integer",
            helpText: t("The index of the selected item")
        },
        {
            name: "animated",
            type: "boolean",
            helpText: t("Use animation when setting the selected item")
        }
    ],
    defaults: {
        animated: true
    },
    label: ([object, selected, animated], [_1, _2, animatedLabel]) => (
        <>
            {object} {selected} <i>{animatedLabel}</i>={animated}
        </>
    ),
    helpText: t("Set the selected item of the roller")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 31,
    name: "sliderSetValue",
    group: "Slider",
    properties: [
        {
            name: "object",
            type: "widget:Slider",
            helpText: t("The slider to set the value")
        },
        {
            name: "value",
            type: "integer",
            helpText: t("The value to set")
        },
        {
            name: "animated",
            type: "boolean",
            helpText: t("Use animation when setting the value")
        }
    ],
    defaults: {
        animated: true
    },
    label: ([object, value, animated], [_1, _2, animatedLabel]) => (
        <>
            {object} {value} <i>{animatedLabel}</i>={animated}
        </>
    ),
    helpText: t("Set the value of the slider")
});

registerAction({
    id: 56,
    name: "sliderSetValueLeft",
    group: "Slider",
    properties: [
        {
            name: "object",
            type: "widget:Slider",
            helpText: t("The slider to set the value")
        },
        {
            name: "valueLeft",
            type: "integer",
            helpText: t("The left value to set")
        },
        {
            name: "animated",
            type: "boolean",
            helpText: t("Use animation when setting the value")
        }
    ],
    defaults: {
        animated: true
    },
    label: ([object, valueLeft, animated], [_1, _2, animatedLabel]) => (
        <>
            {object} {valueLeft} <i>{animatedLabel}</i>={animated}
        </>
    ),
    helpText: t("Set a new value for the left knob of a slider")
});

registerAction({
    id: 57,
    name: "sliderSetRange",
    group: "Slider",
    properties: [
        {
            name: "object",
            type: "widget:Slider",
            helpText: t("The bar to set the value")
        },
        {
            name: "min",
            type: "integer",
            helpText: t("Minimum value")
        },
        {
            name: "max",
            type: "integer",
            helpText: t("Maximum value")
        }
    ],
    defaults: {},
    label: ([object, min, max], [_1, _2, _3]) => (
        <>
            {object} {min} {max}
        </>
    ),
    helpText: t("Set minimum and the maximum values of a slider")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 60,
    name: "tabviewSetActiveTab",
    group: "Tabview",
    properties: [
        {
            name: "object",
            type: "widget:Tabview",
            helpText: t("The tabview to set the active tab")
        },
        {
            name: "tab",
            type: "integer",
            helpText: t("The index of the tab to activate (0-based)")
        },
        {
            name: "animated",
            type: "boolean",
            helpText: t("Use animation when switching tabs")
        }
    ],
    defaults: {
        animated: true
    },
    label: ([object, tab, animated], [_1, _2, animatedLabel]) => (
        <>
            {object} {tab} <i>{animatedLabel}</i>={animated}
        </>
    ),
    helpText: t("Set the active tab of the tabview")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 61,
    name: "tabviewGetActiveTab",
    group: "Tabview",
    properties: [
        {
            name: "object",
            type: "widget:Tabview",
            helpText: t("The tabview to get the active tab")
        },
        {
            name: "result",
            type: "integer",
            isAssignable: true,
            helpText: t("The variable to store the active tab index")
        }
    ],
    defaults: {},
    label: ([object, result]) => (
        <>
            {object}
            <RightArrow />
            {result}
        </>
    ),
    helpText: t("Get the active tab index of the tabview")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 33,
    name: "groupFocusObj",
    group: "Group",
    properties: [
        {
            name: "object",
            type: "widget",
            helpText: t("The object to focus")
        }
    ],
    defaults: {},
    label: ([object]) => <>{object}</>,
    helpText: t("Focus the object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 34,
    name: "groupFocusNext",
    group: "Group",
    properties: [
        {
            name: "group",
            type: "group",
            helpText: t("The group to focus the next object")
        }
    ],
    defaults: {},
    label: ([group]) => <>{group}</>,
    helpText: t("Focus the next object in the group")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 35,
    name: "groupFocusPrev",
    group: "Group",
    properties: [
        {
            name: "group",
            type: "group",
            helpText: t("The group to focus the previous object")
        }
    ],
    defaults: {},
    label: ([group]) => <>{group}</>,
    helpText: t("Focus the previous object in the group")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 36,
    name: "groupGetFocused",
    group: "Group",
    properties: [
        {
            name: "group",
            type: "group",
            helpText: t("The group to get the focused object")
        },
        {
            name: "result",
            type: "widget",
            isAssignable: true,
            helpText: t("The variable to store the focused object")
        }
    ],
    defaults: {
        enabled: true
    },
    label: ([object, result]) => (
        <>
            {object}
            <RightArrow />
            {result}
        </>
    ),
    helpText: t("Get the focused object in the group")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 37,
    name: "groupFocusFreeze",
    group: "Group",
    properties: [
        {
            name: "group",
            type: "group",
            helpText: t("The group to freeze/unfreeze the focus")
        },
        {
            name: "enabled",
            type: "boolean",
            helpText: t("true: freeze, false: release freezing (normal mode)")
        }
    ],
    defaults: {
        enabled: true
    },
    label: ([group, enabled]) => (
        <>
            {group} {enabled}
        </>
    ),
    helpText: t("Do not let to change the focus from the current object")
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 38,
    name: "groupSetWrap",
    group: "Group",
    properties: [
        {
            name: "group",
            type: "group",
            helpText: t("The group to set the wrap")
        },
        {
            name: "enabled",
            type: "boolean",
            helpText: t("true: wrap, false: no wrap")
        }
    ],
    defaults: {
        enabled: false
    },
    label: ([group, enabled]) => (
        <>
            {group} {enabled}
        </>
    ),
    helpText: t(
        "Set whether focus next/prev will allow wrapping from first->last or last->first object."
    )
});

////////////////////////////////////////////////////////////////////////////////

registerAction({
    id: 39,
    name: "groupSetEditing",
    group: "Group",
    properties: [
        {
            name: "group",
            type: "group",
            helpText: t("The group to set the editing mode")
        },
        {
            name: "enabled",
            type: "boolean",
            helpText: t("true: edit mode, false: navigate mode")
        }
    ],
    defaults: {
        enabled: true
    },
    label: ([group, enabled]) => (
        <>
            {group} {enabled}
        </>
    ),
    helpText: t("Manually set the current mode (edit or navigate).")
});

////////////////////////////////////////////////////////////////////////////////

const LV_ANIM_PATH_ENUM_NAME = "LV_ANIM_PATH";

registerLvglEnum(LV_ANIM_PATH_ENUM_NAME, {
    LINEAR: 0,
    EASE_IN: 1,
    EASE_OUT: 2,
    EASE_IN_OUT: 3,
    OVERSHOOT: 4,
    BOUNCE: 5
});

const ANIM_PROPERTIES: IActionPropertyDefinition[] = [
    {
        name: "object",
        type: "widget",
        helpText: t("The object to animate")
    },
    {
        name: "start",
        type: "integer",
        helpText: t("The start value of the animation")
    },
    {
        name: "end",
        type: "integer",
        helpText: t("The end value of the animation")
    },
    {
        name: "delay",
        type: "integer",
        helpText: t("Delay in milliseconds before the animation starts")
    },
    {
        name: "time",
        type: "integer",
        helpText: t("Animation duration in milliseconds")
    },
    {
        name: "relative",
        type: "boolean",
        helpText: t(
            "Determines whether `Start` and `End` values are relative to the current value or are absolute values."
        )
    },
    {
        name: "instant",
        type: "boolean",
        helpText: t(
            "If checked apply the start value immediately, otherwise apply the start value after a delay when the animation really starts"
        )
    },
    {
        name: "path",
        type: `enum:${LV_ANIM_PATH_ENUM_NAME}`,
        helpText: t("The animation path")
    }
];

const ANIM_DEFAULTS = {
    start: 0,
    end: 100,
    delay: 0,
    time: 1000,
    relative: true,
    instant: false,
    path: "LINEAR"
};

const animLabel = (
    [object, start, end, delay, time, relative, instant, path]: string[],
    [
        _1,
        startLabel,
        endLabel,
        delayLabel,
        timeLabel,
        relativeLabel,
        instantLabel,
        _2
    ]: string[]
) => (
    <>
        {object} <i>{startLabel}</i>={start} <i>{endLabel}</i>={end}{" "}
        <i>{delayLabel}</i>={delay} <i>{timeLabel}</i>={time}
        {relative == "ON" ? " RELATIVE" : ""}
        {instant == "ON" ? " INSTANT" : ""} {path}
    </>
);

registerAction({
    id: 40,
    name: "animX",
    group: "Animation",
    properties: ANIM_PROPERTIES,
    defaults: ANIM_DEFAULTS,
    label: animLabel,
    helpText: t("Animate the x coordinate of the object")
});

registerAction({
    id: 41,
    name: "animY",
    group: "Animation",
    properties: ANIM_PROPERTIES,
    defaults: ANIM_DEFAULTS,
    label: animLabel,
    helpText: t("Animate the y coordinate of the object")
});

registerAction({
    id: 42,
    name: "animWidth",
    group: "Animation",
    properties: ANIM_PROPERTIES,
    defaults: ANIM_DEFAULTS,
    label: animLabel,
    helpText: t("Animate the width of the object")
});

registerAction({
    id: 43,
    name: "animHeight",
    group: "Animation",
    properties: ANIM_PROPERTIES,
    defaults: ANIM_DEFAULTS,
    label: animLabel,
    helpText: t("Animate the height of the object")
});

registerAction({
    id: 44,
    name: "animOpacity",
    group: "Animation",
    properties: ANIM_PROPERTIES,
    defaults: ANIM_DEFAULTS,
    label: animLabel,
    helpText: t("Animate the opacity of the object")
});

registerAction({
    id: 45,
    name: "animImageZoom",
    group: "Animation",
    properties: ANIM_PROPERTIES,
    defaults: ANIM_DEFAULTS,
    label: animLabel,
    helpText: t("Animate the zoom of the image")
});

registerAction({
    id: 46,
    name: "animImageAngle",
    group: "Animation",
    properties: ANIM_PROPERTIES,
    defaults: ANIM_DEFAULTS,
    label: animLabel,
    helpText: t("Animate the angle of the image")
});
