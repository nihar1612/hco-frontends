import experiments from './experiments.json';
import { createContext, useContext } from 'react';

export interface Variant {
  name: string;
  id: number;
  weight: number;
  metadata?: { [key: string]: any };
}

type Experiment = {
  id: string;
  name: string;
  active: boolean;
  cookie: string;
  urls: string[];
  variants: Variant[];
  urlBased?: boolean;
};

export function getCurrentExperiment(url?: string): Experiment | undefined {
  return experiments
    .filter((experiment) => experiment.active)
    .find((experiment) => !url || experiment.urls.some((expUrl) => url.match(expUrl)));
}

const experimentContext = createContext<{ experiment: Experiment; variant: Variant }>(null);

export const ExperimentProvider = experimentContext.Provider;

export const useExperiment = () => useContext(experimentContext)?.experiment;
export const useVariant = () => useContext(experimentContext)?.variant;
