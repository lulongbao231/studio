import {
    IExtensionDefinition,
    IFieldProperties
} from "eez-studio-shared/extensions/extension";
import { t } from "eez-studio-shared/i18n";

const fftParametersDescription: IFieldProperties[] = [
    // {
    //     name: "windowSize",
    //     displayName: "Size",
    //     type: "enum",
    //     defaultValue: 65536,
    //     enumItems: [...Array(17).keys()].map(x => Math.pow(2, 7 + x))
    // },
    // {
    //     name: "windowFunction",
    //     displayName: "Function",
    //     type: "enum",
    //     defaultValue: "rectangular",
    //     enumItems: [
    //         { id: "rectangular", label: "Rectangular window" },
    //         { id: "hamming", label: "Hamming window" },
    //         { id: "hann", label: "Hanning window" },
    //         { id: "blackman", label: "Blackman window" },
    //         { id: "blackman_harris", label: "Blackman-Harris window" },
    //         { id: "gaussian-2.5", label: "Gaussian (a=2.5) window" },
    //         { id: "gaussian-3.5", label: "Gaussian (a=3.5) window" },
    //         { id: "gaussian-4.5", label: "Gaussian (a=4.5) window" }
    //     ]
    // },
    // {
    //     name: "resample",
    //     displayName: "Resample",
    //     type: "range",
    //     defaultValue: 1,
    //     minValue: 1,
    //     maxValue: 100
    // },
    {
        name: "xAxis",
        displayName: t("X axis"),
        type: "enum",
        defaultValue: "logarithmic",
        enumItems: [
            { id: "logarithmic", label: t("Logarithmic") },
            { id: "linear", label: t("Linear") },
            { id: "harmonics", label: t("Harmonics") }
        ]
    },
    {
        name: "yAxis",
        displayName: t("Y axis"),
        type: "enum",
        defaultValue: "decibel",
        enumItems: [
            { id: "decibel", label: t("Decibel") },
            { id: "linear", label: t("Linear") }
        ]
    },
    {
        name: "numHarmonics",
        displayName: t("No. of harmonics"),
        type: "number",
        defaultValue: 40,
        visible: values => {
            return values.xAxis === "harmonics";
        }
    }
];

const basicMeasurementsExtension: IExtensionDefinition = {
    preInstalled: true,
    extensionType: "measurement-functions",

    measurementFunctions: [
        {
            id: "min",
            name: t("Min"),
            script: "min.js"
        },
        {
            id: "max",
            name: t("Max"),
            script: "max.js"
        },
        {
            id: "peak-to-peak",
            name: t("Peak-to-peak"),
            script: "peak-to-peak.js"
        },
        {
            id: "average",
            name: t("Average"),
            script: "average.js"
        },
        {
            id: "period",
            name: t("Period"),
            script: "period.js"
        },
        {
            id: "frequency",
            name: t("Frequency"),
            script: "frequency.js"
        },
        {
            id: "fft",
            name: t("FFT"),
            script: "fft.js",
            parametersDescription: fftParametersDescription,
            resultType: "chart"
        },
        {
            id: "add",
            name: t("A + B"),
            script: "add.js",
            arity: 2,
            resultType: "chart"
        },
        {
            id: "sub",
            name: t("A - B"),
            script: "sub.js",
            arity: 2,
            resultType: "chart"
        }
        // {
        //     id: "acActivePower",
        //     name: "AC Active Power",
        //     script: "ac_active.js",
        //     arity: 2
        // },
        // {
        //     id: "acReactivePower",
        //     name: "AC Reactive Power",
        //     script: "ac_reactive.js",
        //     arity: 2
        // },
        // {
        //     id: "acApparentPower",
        //     name: "AC Apparent Power",
        //     script: "ac_apparent.js",
        //     arity: 2
        // }
    ]
};

export default basicMeasurementsExtension;
