import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppSelector } from '../store';

type DispatchFunction = () => AppDispatch;

export const useRDispatch: DispatchFunction = useDispatch;
export const useRSelector: TypedUseSelectorHook<AppSelector> = useSelector;
