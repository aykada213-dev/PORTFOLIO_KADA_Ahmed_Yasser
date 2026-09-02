import { Component } from 'react'

export class HeroErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Hero 3D scene failed to render:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }

    return this.props.children
  }
}

export function NetworkFallback() {
  return (
    <div className="network-fallback" aria-label="Network visual fallback">
      <div className="fallback-grid" />
      <div className="fallback-nodes">
        <span className="fallback-node node-a" />
        <span className="fallback-node node-b" />
        <span className="fallback-node node-c" />
        <span className="fallback-node node-d" />
        <span className="fallback-node node-e" />
      </div>
    </div>
  )
}
