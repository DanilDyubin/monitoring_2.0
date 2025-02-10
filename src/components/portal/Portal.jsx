import { useState, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

function createWrapperAndAppendToBody(wrapperId) {
  // создаем дефолтную обертку для children, если wrapperId не будет передан
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  wrapperElement.setAttribute('class', 'modal');
  document.body.append(wrapperElement);
  return wrapperElement;
}

function Portal({ children, wrapperId = 'portal-wrapper' }) {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    // используем useLayoutEffect, т/к нам нужно получить элемент еще до рендеринга всей верстки
    let element = document.getElementById(wrapperId);
    let created = false;

    if (!element) {
      created = true; // эта переменная создается для проверке существует ли элемент на странице или он был создан с помощью createWrapperAndAppendToBody, потому что во втором случае его нужно будет при закрытии удалить со страницы
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (created) {
        element?.remove(); // если мы сами создали элемент, то его нужно удалить после закрытия, иначе он останется на странице
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null; // делаем проверку, т/к при первом рендере обертка может быть null и в таком случае компонент ничего не будет возвращать

  return createPortal(children, wrapperElement);
}

export default Portal;
