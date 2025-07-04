import { type FC } from 'react';
import { ObjectViewArray } from './ObjectViewArray';
import { ObjectViewBoolean } from './ObjectViewBoolean';
import { ObjectViewNull } from './ObjectViewNull';
import { ObjectViewNumber } from './ObjectViewNumber';
import { ObjectViewObject } from './ObjectViewObject';
import { ObjectViewPromise } from './ObjectViewPromise';
import { ObjectViewString } from './ObjectViewString';
import { ObjectViewUndefined } from './ObjectViewUndefined';
import { ObjectViewUnknown } from './ObjectViewUnknown';
import { ObjectViewFunction } from './ObjectViewFunction';
import { ObjectViewError } from './ObjectViewError';
import { ObjectViewDate } from './ObjectViewDate';

export const ObjectView: FC<{ value: unknown }> = ({ value }) => {
  if (value === null) return <ObjectViewNull />;
  if (value === undefined) return <ObjectViewUndefined />;

  if (typeof value === 'string') {
    return <ObjectViewString value={value} />;
  }

  if (typeof value === 'number') {
    return <ObjectViewNumber value={value} />;
  }

  if (typeof value === 'boolean') {
    return <ObjectViewBoolean value={value} />;
  }

  if (Array.isArray(value)) {
    return <ObjectViewArray value={value} />;
  }

  if (value instanceof Date) {
    return <ObjectViewDate value={value} />;
  }

  if (value instanceof Promise) {
    return <ObjectViewPromise value={value} />;
  }

  // TODO: Support `Error.isError`.
  if (value instanceof Error) {
    return <ObjectViewError value={value} />;
  }

  if (typeof value === 'function') {
    return <ObjectViewFunction value={value} />;
  }

  if (typeof value === 'object') {
    return <ObjectViewObject value={value} />;
  }

  return <ObjectViewUnknown />;
};
