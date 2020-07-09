module.exports = {
  template(
    { template },
    opts,
    { imports, componentName, props, jsx, exports }
  ) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] });
    return typeScriptTpl.ast`
      import React from 'react';
        const ${componentName}: React.FC<React.SVGProps<SVGSVGElement>> = props => ${jsx};
      export default ${componentName};
    `;
  },
};
